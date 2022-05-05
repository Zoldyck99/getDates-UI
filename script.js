var output = [];
function submit() {
    try {
        const weekDays = [...document.querySelectorAll('input[type=checkbox]:checked')].map(e => e.value);
        const startDate = document.getElementById('date').value.toString();
        if(startDate == ""){                            // check if no date was selected, to avoid crashes
            alert("Please Choose a Start Date :)");
        }else if(weekDays.length == 0){                     // check if no WeekDay was selected 
            alert("Please Choose a WeekDay.");
        }else{
            const period = Number(document.getElementById('period').value);
            const dateFormat = [...document.querySelectorAll('.dateFormat:checked')].map(e => e.value);
            const direction = Number([...document.querySelectorAll('.direction:checked')].map(e => e.value)[0]);
            output = [];
    
            weekDays.forEach(day => {                       // add the dates of each selected WeekDay to the same array
                output = [...output, ...getDates(day, startDate, period, dateFormat[0], direction)]
            })
            output.sort((a, b) => {                         // sort all the dates
                const date1 = new Date(a);
                const date2 = new Date(b);
    
                return date1 - date2;
            })

            document.getElementById('output').innerHTML = output.join('<br>');      // new line for each date
            location.href = "#output";                                              // move the screen to the output field
        }

    } catch (err) {
        console.log(err);
    }

}
function copy() {
    navigator.clipboard.writeText(document.getElementById('output').innerText).then(() => {

        location.href = "#clk";                                             // move the scree to the "click to copy" field
        document.getElementById('clk').innerText = "Copied!";
        setTimeout(() => {
            document.getElementById('clk').innerText = "Click to copy";

        }, 1500);
    });
}

function getDates(weekDay = '', startDate = '', period = 1, dateFormat = 1, direction = 1) {
    try {
        let date = new Date(startDate);
        let end = new Date(startDate);

        const arr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        // if (!arr.includes(weekDay)) { throw "Week day is not specified properly! should be one of: " + arr; }
        while (date.getDay() != arr.indexOf(weekDay)) { date.setDate(date.getDate() + 1); }             // Set the date to match the WeekDay selected (ex: Selected weekDay = Sunday, but the selected date belongs to Monday)
        let datesList = [];

        if (direction == 1) {    // coming dates
            end.setMonth(date.getMonth() + period);
            let endMonth = end.getMonth() + 1;
            let endYear = end.getFullYear();
            let separator;

            (dateFormat == 1)? separator = '-': (dateFormat == 2)? separator = '/': separator = ' ';        // set the separator type
            doAll(datesList, separator, date, endMonth, endYear, direction);

        } else {      // passing dates

            end.setMonth(date.getMonth() - period);
            let endMonth = end.getMonth() - 1;
            let endYear = end.getFullYear();
            let separator;

            (dateFormat == 1)? separator = '-': (dateFormat == 2)? separator = '/': separator = ' ';    // set the separator type
            doAll(datesList, separator, date, endMonth, endYear, direction);
        }

        return datesList;

    } catch (err) {
        console.log(err)
    }



    function doAll(datesList, separator, date, endMonth, endYear, direction) {

        try {
            if (date.getFullYear() != endYear) {                       //if the chosen period have a different year other than the startingDate, add dates until this year is reached.               
                while (date.getFullYear() != endYear) {
                    pushDates(date, datesList, separator, direction);
                }
            }
            while (date.getMonth() != endMonth) {                     // add dates until the month period is reached.                    
                pushDates(date, datesList, separator, direction);
            }

        } catch (err) {
            console.log(err);
        }
    }


    var d;
    var m;
    var y;
    var formatted;
    function pushDates(date, datesList, separator, direction) {                
        try {
            // set the d, m, y of that date and push it into the array
            if (separator == ' ') {                                  
                d = date.getDate();
                m = date.toLocaleString('default', { month: 'short' });
                y = date.getFullYear();
            } else {
                d = date.getDate();
                m = date.getMonth() + 1;
                y = date.getFullYear();
            }
            formatted = formatDate(d, m, y, separator);

            datesList.push(formatted);
            (direction == 1) ? date.setDate(date.getDate() + 7) : date.setDate(date.getDate() - 7);         // move the date ahead/back depending on the chosen direction

        } catch (err) {
            console.log(err);
        }
    }

    function formatDate(d, m, y, separator) {                                                           // format the date
        try {
            return y + separator + (m < 10 ? '0' + m : m) + separator + (d < 10 ? '0' + d : d);

        } catch (err) {
            console.log(err);
        }
    }

}
