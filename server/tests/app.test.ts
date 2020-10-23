import request from 'supertest';
import { v4 } from 'uuid';
import { Server } from 'http';
import jwt_decode from 'jwt-decode';

import App from '../src/providers/app';
import { SnippetModel } from '../src/models/snippet';
import { UserDto } from '../src/interfaces/dtos/userDto';

let server: Server;

beforeAll(async () => {
  server = await App.loadServer();
});

afterAll((done) => {
  server.close(done);
});

describe('GET /auth/register', () => {
  it('should create user and return token', async () => {
    // Arrange
    const user: UserDto = {
      email: `${v4()}@asdf.com`,
      password: v4(),
      firstName: v4(),
      lastName: v4(),
    };

    // Act
    const res = await request(server).post('/api/auth/register').send(user);

    // Assert
    expect(res.status).toBe(201);

    const { token } = res.body;
    const tokenInfo: any = jwt_decode(token);
    expect(tokenInfo.email).toBe(user.email);
    expect(tokenInfo.firstName).toBe(user.firstName);
    expect(tokenInfo.lastName).toBe(user.lastName);
    expect(tokenInfo._id).toBeTruthy();
    expect(tokenInfo.password).toBeFalsy();
  });

  it('should return 401 when user exists', async () => {
    // Arrange
    const user: UserDto = {
      email: `${v4()}@asdf.com`,
      password: v4(),
      firstName: v4(),
      lastName: v4(),
    };
    await request(server).post('/api/auth/register').send(user);

    // Act
    const res = await request(server).post('/api/auth/register').send(user);

    // Assert
    expect(res.status).toBe(401);
  });

  it('should return 422 when first name is invalid', async () => {
    // Arrange
    const user: UserDto = {
      email: `${v4()}@asdf.com`,
      password: v4(),
      firstName: '',
      lastName: v4(),
    };
    await request(server).post('/api/auth/register').send(user);

    // Act
    let res = await request(server).post('/api/auth/register').send(user);

    // Assert
    expect(res.status).toBe(422);

    // Assert
    user.firstName = 'a';

    // Act
    res = await request(server).post('/api/auth/register').send(user);

    // Assert
    expect(res.status).toBe(422);
  });

  it('should return 422 when last name is invalid', async () => {
    // Arrange
    const user: UserDto = {
      email: `${v4()}@asdf.com`,
      password: v4(),
      firstName: v4(),
      lastName: '',
    };
    await request(server).post('/api/auth/register').send(user);

    // Act
    let res = await request(server).post('/api/auth/register').send(user);

    // Assert
    expect(res.status).toBe(422);

    // Assert
    user.lastName = 'a';

    // Act
    res = await request(server).post('/api/auth/register').send(user);

    // Assert
    expect(res.status).toBe(422);
  });

  it('should return 422 when password is invalid', async () => {
    // Arrange
    const user: UserDto = {
      email: `${v4()}@asdf.com`,
      password: '',
      firstName: v4(),
      lastName: v4(),
    };
    await request(server).post('/api/auth/register').send(user);

    // Act
    let res = await request(server).post('/api/auth/register').send(user);

    // Assert
    expect(res.status).toBe(422);

    // Assert
    user.password = 'a';

    // Act
    res = await request(server).post('/api/auth/register').send(user);

    // Assert
    expect(res.status).toBe(422);
  });

  it('should return 422 when email is invalid', async () => {
    // Arrange
    const user: UserDto = {
      email: v4(),
      password: v4(),
      firstName: v4(),
      lastName: v4(),
    };
    await request(server).post('/api/auth/register').send(user);

    // Act
    let res = await request(server).post('/api/auth/register').send(user);

    // Assert
    expect(res.status).toBe(422);

    // Assert
    user.email = '';

    // Act
    res = await request(server).post('/api/auth/register').send(user);

    // Assert
    expect(res.status).toBe(422);
  });
});

describe('GET /auth/login', () => {
  it('should return 401 when user doesnt exit', async () => {
    // Arrange
    const user: UserDto = {
      email: `${v4()}@asdf.com`,
      password: v4(),
      firstName: v4(),
      lastName: v4(),
    };

    // Act
    const res: request.Response = await request(server).post('/api/auth/login').send(user);

    // Assert
    expect(res.status).toBe(401);

    const { token } = res.body;
    expect(token).toBeFalsy();
  });

  it('should return 401 when password doesnt match', async () => {
    // Arrange
    const user: UserDto = {
      email: `${v4()}@asdf.com`,
      password: v4(),
      firstName: v4(),
      lastName: v4(),
    };
    await request(server).post('/api/auth/register').send(user);

    user.password = 'wrong pass';
    // Act
    const res: request.Response = await request(server).post('/api/auth/login').send(user);

    // Assert
    expect(res.status).toBe(401);

    const { token } = res.body;
    expect(token).toBeFalsy();
  });

  it('should return token when user exists', async () => {
    // Arrange
    const user: UserDto = {
      email: `${v4()}@asdf.com`,
      password: v4(),
      firstName: v4(),
      lastName: v4(),
    };
    await request(server).post('/api/auth/register').send(user);

    // Act
    const res: request.Response = await request(server).post('/api/auth/login').send(user);

    // Assert
    expect(res.status).toBe(200);

    const { token } = res.body;
    const tokenInfo: any = jwt_decode(token);
    expect(tokenInfo.email).toBe(user.email);
    expect(tokenInfo.firstName).toBe(user.firstName);
    expect(tokenInfo.lastName).toBe(user.lastName);
    expect(tokenInfo._id).toBeTruthy();
    expect(tokenInfo.password).toBeFalsy();
  });
});

describe('GET /snippets', () => {
  it('should return data when no user is authenticated', async () => {
    // Act
    const res: request.Response = await request(server).get('/api/snippets');

    // Assert
    expect(res.status).toBe(200);
    expect(res.type).toBe('application/json');

    const snippets = res.body as SnippetModel[];
    expect(snippets.length).toBeGreaterThan(0);

    const snippet = snippets.find((s) => s.name === 'Validating a Date Format');
    expect(snippet).toBeTruthy();
    expect(snippet!.code.indexOf('ValidateDateFormat') > -1).toBeTruthy();
    expect(snippet!.tags.length > 0).toBeTruthy();
    expect(snippet!.likes.length > 0).toBeTruthy();
    expect(snippet!.author).toBeTruthy();
  });

  it('should return data when user is authenticated', async () => {
    // Arrange
    const user: UserDto = {
      email: `${v4()}@asdf.com`,
      password: v4(),
      firstName: v4(),
      lastName: v4(),
    };
    const authResponse = await request(server).post('/api/auth/register').send(user);
    const { token } = authResponse.body;

    // Act
    const res = await request(server).get('/api/snippets').set('Authorization', `Bearer ${token}`);

    // Assert
    expect(res.status).toBe(200);

    const snippets = res.body as SnippetModel[];
    expect(snippets.length).toBeGreaterThan(0);
  });
});

describe('GET /snippets/mine', () => {
  it('should require authentication', async () => {
    // Act
    const res: request.Response = await request(server).get('/api/snippets/mine');

    // Assert
    expect(res.status).toBe(401);
  });

  it('should return data when user is authenticated', async () => {
    // Arrange
    const user: UserDto = {
      email: `${v4()}@asdf.com`,
      password: v4(),
      firstName: v4(),
      lastName: v4(),
    };
    const authResponse = await request(server).post('/api/auth/register').send(user);
    const { token } = authResponse.body;

    // Act
    let res = await request(server).get('/api/snippets/mine').set('Authorization', `Bearer ${token}`);

    // Assert
    expect(res.status).toBe(200);

    let snippets = res.body as SnippetModel[];
    expect(snippets.length).toBe(0);

    // Arrange
    const snippet = {
      name: v4(),
      code: v4(),
      tags: [v4()],
    };
    await request(server).post('/api/snippets').send(snippet).set('Authorization', `Bearer ${token}`);

    // Act
    res = await request(server).get('/api/snippets/mine').set('Authorization', `Bearer ${token}`);

    // Assert
    expect(res.status).toBe(200);

    snippets = res.body as SnippetModel[];
    expect(snippets.length).toBe(1);
    expect(snippets[0].name).toBe(snippets[0].name);
    expect(snippets[0].code).toBe(snippets[0].code);
  });
});

describe('GET /snippets/:id', () => {
  it('should return data when user is not authenticated', async () => {
    // Arrange
    const allSnippetsResponse: request.Response = await request(server).get('/api/snippets');
    expect(allSnippetsResponse.status).toBe(200);

    const snippets = allSnippetsResponse.body as SnippetModel[];

    // Act
    const res: request.Response = await request(server).get(`/api/snippets/${snippets[0]._id}`);

    // Assert
    expect(res.status).toBe(200);

    const snippet = res.body as SnippetModel;
    expect(snippet).toBeTruthy();
    expect(snippet._id).toBe(snippets[0]._id);
  });

  it('should return data when user is authenticated', async () => {
    // Arrange
    const user: UserDto = {
      email: `${v4()}@asdf.com`,
      password: v4(),
      firstName: v4(),
      lastName: v4(),
    };
    const authResponse = await request(server).post('/api/auth/register').send(user);
    const { token } = authResponse.body;

    const allSnippetsResponse: request.Response = await request(server).get('/api/snippets');
    expect(allSnippetsResponse.status).toBe(200);

    const snippets = allSnippetsResponse.body as SnippetModel[];

    // Act
    const res = await request(server).get(`/api/snippets/${snippets[0]._id}`).set('Authorization', `Bearer ${token}`);

    // Assert
    expect(res.status).toBe(200);

    const snippet = res.body as SnippetModel;
    expect(snippet).toBeTruthy();
    expect(snippet._id).toBe(snippets[0]._id);
    expect(snippet.name).toBe(snippets[0].name);
    expect(snippet.code).toBe(snippets[0].code);
  });
});
