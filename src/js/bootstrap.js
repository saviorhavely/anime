try {
    window.$ = window.jQuery = require('jquery');

    require('jquery-validation');
    require('jquery-mask-plugin');
    require('animejs');

    window.axios = require('axios');
    axios.defaults.baseURL = '';
    
} catch (e) {}

