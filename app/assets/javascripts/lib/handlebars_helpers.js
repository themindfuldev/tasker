/**
 * This helper provides a date formatting tool
 *
* date is the date to parse and format
* outputPattern is the pattern used to display the date (optional)
* inputPattern is the pattern used to parse the date (optional)
* lang is the lang used by moment (optional, the specific lang module must be loaded before use)
*
 * Usage: <span>{{formatDate myDate "MM/DD/YYYY"}}</span>
 */
Handlebars.registerHelper('formatDate', function(date, outputPattern, inputPattern) {
    var defaultPattern = 'DD/MM/YYYY HH:mm';
    var momentDate;

    if(date) {
        if((date instanceof Date) || (date instanceof Array)) {
            momentDate = moment(date);
        }
        else if(typeof(date) === 'string') {
            if(!inputPattern || (typeof(inputPattern) !== 'string')) {
                inputPattern = defaultPattern;
            }
            momentDate = moment(date, inputPattern);
        }

        // Improved version to format a milliseconds date
        else if(typeof(date) === 'number') {
            if(!inputPattern || (typeof(inputPattern) !== 'string')) {
                inputPattern = defaultPattern;
            }
            date = new Date(date);
            momentDate = moment(date);
        }

        else {
            return date;
        }
    }
    else {
        return "";
    }

    if(!outputPattern || (typeof(outputPattern) !== 'string')) {
        outputPattern = defaultPattern;
    }
    return momentDate.format(outputPattern);
});

/**
 * This helper provides a if comparing two values
 *
 * If only the two values are strictly equals ('===') display the block
 *
 * Usage:
 *        {{#ifequals type "details"}}
 *            <span>This is details page</span>
 *        {{/ifequals}}
 */
Handlebars.registerHelper('ifequals', function(value1, value2, options) {
    if (value1 === value2) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});
