'use strict';

const ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  SUPERADMIN: 'superadmin',
};

const ALL_ROLES = Object.values(ROLES);

module.exports = { ROLES, ALL_ROLES };
