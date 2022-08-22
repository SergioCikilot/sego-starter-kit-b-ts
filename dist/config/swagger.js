"use strict";
const swaggerAutogen = require('swagger-autogen')();
const outputFile = './swagger_output.json';
const endpointsFiles = ['dist/api/userApi.js'];
swaggerAutogen(outputFile, endpointsFiles).then(() => {
    require('../index.js');
});
//# sourceMappingURL=swagger.js.map