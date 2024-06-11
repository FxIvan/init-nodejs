const messages = {
  /* Strings */
  "string.pattern.base":
    "{{#label}} no debe contener espacios ni caracteres especiales",
  "string.alphanum": "{{#label}} Puede contener solo carácteres alfanumericos",
  "string.base": "{{#label}} debe ser una cadena de texto",
  "string.base64":
    "{{#label}} debe ser una cadena de texto codificada en base64",
  "string.creditCard": "{{#label}} debe ser una tarjeta de credito",
  "string.dataUri":
    "{{#label}} debe ser una cadena de texto codificada en un URI de datos",
  "string.domain": "{{#label}} debe ser un dominio",
  "string.email": "{{#label}} debe ser un correo electronico",
  "string.empty": "{{#label}} no puede estar vacio",
  "string.guid": "{{#label}} debe ser un GUID",
  "string.isoDate": "{{#label}} debe ser una fecha ISO",
  "string.isoDuration": "{{#label}} debe ser una duracion ISO",
  "string.length": "{{#label}} debe tener {{#limit}} caracteres",
  "string.lowercase": "{{#label}} debe ser una cadena de texto en minusculas",
  "string.max": "{{#label}} debe ser menor o igual a {{#limit}} caracteres",
  "string.min": "{{#label}} debe ser mayor o igual a {{#limit}} caracteres",
  "string.uppercase": "{{#label}} debe ser una cadena de texto en mayusculas",

  /* Numbers */
  "number.base": "{{#label}} debe ser un numero",
  "number.greater": "{{#label}} debe ser mayor a {{#limit}}",
  "number.infinity": "{{#label}} no debe ser un numero infinito",
  "number.integer": "{{#label}} debe ser un numero entero",
  "number.less": "{{#label}} debe ser menor a {{#limit}}",
  "number.max": "{{#label}} debe ser menor o igual a {{#limit}}",
  "number.min": "{{#label}} debe ser mayor o igual a {{#limit}}",
  "number.multiple": "{{#label}} debe ser un numero multiplo de {{#multiple}}",
  "number.negative": "{{#label}} debe ser un numero negativo",
  "number.port": "{{#label}} debe ser un puerto",
  "number.positive": "{{#label}} debe ser un numero positivo",
  "number.precision": "{{#label}} debe tener una precision de {{#precision}}",
  "number.unsafe": "{{#label}} no debe ser un numero seguro",

  /* Dates */
  "date.base": "{{#label}} debe ser una fecha",
  "date.format": "{{#label}} debe tener el formato {{#format}}",
  "date.greater": "{{#label}} debe ser mayor a {{:#limit}}",
  "date.less": "{{#label}} debe ser menor a {{:#limit}}",
  "date.min": "{{#label}} debe ser mayor o igual a {{:#limit}}",
  "date.max": "{{#label}} debe ser menor o igual a {{:#limit}}",
  // Messages used in date.format
  "date.format.iso": "ISO 8601 date",
  "date.format.javascript": "timestamp or number of milliseconds",
  "date.format.unix": "timestamp or number of seconds",

  /* Any */
  "any.custom":
    "{{#label}} no es valido dado que no cumple con la validacion: {{#error.message}}",
  "any.default": "{{#label}} threw an error when running default method",
  "any.failover": "{{#label}} threw an error when running failover method",
  "any.invalid": "{{#label}} no es valido",
  "any.only":
    '{{#label}} must be {if(#valids.length == 1, "", "one of ")}{{#valids}}',
  "any.ref": "{{#label}} {{#arg}} references {{:#ref}} which {{#reason}}",
  "any.required": "{{#label}} es requerido",
  "any.unknown": "{{#label}} no es permitido",
};

const hashMessage = {
  "string.pattern.base": "The wallet address is not valid.",
  "string.empty": "El hash no puede estar vacío",
};

const walletMessage = {
  "string.pattern.base":
    "La wallet de Ethereum que has ingresado no es correcta",
  "string.empty": "La wallet de Ethereum no puede estar vacía",
};

const passwordMessage = {
  "string.pattern.base":
    "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial",
  "string.empty": "La contraseña no puede estar vacía",
};

const ibanMessage = {
  "string.pattern.base": "El IBAN que has ingresado no es correcto",
  "string.empty": "El IBAN no puede estar vacío",
};

module.exports = {
  messages,
  hashMessage,
  walletMessage,
  passwordMessage,
  ibanMessage,
};
