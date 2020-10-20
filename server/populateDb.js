db.snippets.insert([
  {
    name: 'CSS Conic Gradient',
    code: `conic-gradient() = conic-gradient(
      [ from <angle> ]? [ at <position> ]?,
      <angular-color-stop-list>
    )
    .conic-gradient {
      background: conic-gradient(#fff, #000);
    }
    .conic-gradient {
      /* Original example */
      background-image: conic-gradient(#fff, #000);
      /* Explicitly state the location center point */
      background: conic-gradient(at 50% 50%, #fff, #000);
      /* Explicitly state the angle of the start color */
      background: conic-gradient(from 0deg, #fff, #000);
      /* Explicitly state the angle of the start color and center point location */
      background: conic-gradient(from 0deg at center, #fff, #000);
      /* Explicitly state the angles of both colors as percentages instead of degrees */
      background: conic-gradient(#fff 0%, #000 100%);
      /* Explicitly state the angle of the starting color in degrees and the ending color by a full turn of the circle */
      background: conic-gradient(#fff 0deg, #000 1turn);
    }`
  },
  {
    name: 'Validating a Date Format',
    code: `function ValidateDateFormat(input) {
      var dateString = input.value;
   
      var regex = /(((0[1-9]|1[0-2])\/(0|1)[0-9]|2[0-9]|3[0-1])\/((19|20)\d\d))$/;
   
      //Check whether valid dd/MM/yyyy Date Format.
      if (regex.test(dateString) || dateString.length == 0) {
          ShowHideError("none");
      } else {
          ShowHideError("block");
          input.focus();
          input.select();
      }
    };`
  }
])