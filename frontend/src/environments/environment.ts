// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    //API_URL: 'http://13.211.231.244:3000/',
    API_URL: 'http://localhost:3000/',
    PASSWORD_REGEX: "^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@\!#$%^&+=])[a-zA-Z0-9@#\!$%^&+=]*$",
    //google_api_key: "AIzaSyCcvuBSTZ5P8My0Am1uy0RgRQ7gu5SyuAw",
    EMAIL_REGEX: "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}",
    NUMBER_REGEX: "^\\d*[1-9]\\d*$",
    //PROPERTY_ID_CODE_REGEX: "[0-9]*[a-zA-Z]{2}[0-9]*",
    //DECIMAL_REGEX: "[0-9]\\d*(\\.\\d+)?$",
}