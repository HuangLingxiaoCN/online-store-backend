"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const { CLIENT_ORIGIN } = require('../config')
const email_config_1 = __importDefault(require("./email.config"));
// This file is exporting an Object with a single key/value pair.
// However, because this is not a part of the logic of the application
// it makes sense to abstract it to another file. Plus, it is now easily 
// extensible if the application needs to send different email templates
// (eg. unsubscribe) in the future.
exports.default = {
    confirm: (id) => ({
        subject: 'React Confirm Email',
        html: `
      <a href='${email_config_1.default}/confirm/${id}'>
        click to confirm email
      </a>
    `,
        text: `Copy and paste this link: ${email_config_1.default}/confirm/${id}`
    })
};
//# sourceMappingURL=email.templates.js.map