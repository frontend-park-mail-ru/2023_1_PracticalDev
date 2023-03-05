export const isUsername = (str) => /^[A-Za-z][a-zA-Z0-9_]{7,29}$/.test(str);

export const isPassword = (str) => /^[a-zA-Z0-9_\-#!$@%^&*+~=:;?\\/]{8,}$/.test(str);

export const isEmail = (str) => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/i.test(str);

export const isMobilePhone = (str) => /^(\+?7|8)?9\d{9}$/.test(str);

export const isURL = (str) => /https?:\/\/(www\.)?[-\w@:%.+~#=]{1,256}\.[a-z0-9()]{1,6}\b([-\w()@:%.+~#=//?&]*)/i.test(str);

export const isImage = (str) => /.+\.(?=png|jpe?g|gif|svg)/i.test(str);
