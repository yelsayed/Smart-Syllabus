(function(){
    var app = angular.module('syllabus', ['mwl.calendar','ui.bootstrap','ngAnimate']);
    app.controller('calendar',['$scope',function($scope) {
         var vm = this;

        var monthNames = ["January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];

        var abrvMonthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct"
                                ,"Nov","Dec"];

        //These variables MUST be set as a minimum for the calendar to work
        $scope.calendarView = 'month';
        $scope.calendarDay = new Date();
        var d = new Date();
        var monInd = d.getMonth();
        $scope.year = moment().year();
        $scope.month = monthNames[monInd];
        $scope.calendarTitle = "Course Calendar";

        $scope.incrMonth = function() {
            if (monInd == 11) {
                $scope.year += 1;
            }
            monInd += 1;
            monInd %= 12;
            $scope.month = monthNames[monInd];
        };

        $scope.decrMonth = function() {
            if (monInd == 0) {
                monInd = 11;
                $scope.year -= 1;
            } else {
                monInd -= 1;
            }
            $scope.month = monthNames[monInd];
        };

        $scope.toDate = function(){
            d = new Date();
            monInd = d.getMonth();
            $scope.month = monthNames[monInd];
            $scope.year = moment().year();
        };

        this.year = 2015;

        $scope.events = [
          {
            title: 'An event',
            type: 'warning',
            startsAt: new Date(2015,5,1),
            draggable: true,
            resizable: true
          }
        ];

        this.parseCalendar = function readTextFile(file) {
            var rawFile = new XMLHttpRequest();
            var tokens = [];
            rawFile.open("GET", file, false);
            rawFile.onreadystatechange = function ()
            {
                if(rawFile.readyState === 4)
                {
                    if(rawFile.status === 200 || rawFile.status == 0)
                    {
                        var allText = rawFile.responseText;
                        var lines = allText.split(/\r\n|\r|\n/g);
                        var token = [];

                        for (var i = 0; i < lines.length; i++) {
                            var tokenLine = lines[i].split("  ");
                            for (var t = 0; t < tokenLine.length; t++) {
                                if (tokenLine[t] != "") {
                                    token.push(tokenLine[t]);
                                }
                            }
                            tokens.push(token);
                            token = [];
                        }
                    }
                }
            };
            rawFile.send(null);




            // Creating dates
            for (var i in tokens) {
                var currElem;
                var elem = tokens[i];
                var color = "";
                var title = "";
                var date = new Date();
                //console.log(elem);
                var calObj = [];

                for (var counter = 0; counter < elem.length; counter++) {
                    var obj = {};

                    // Getting the date here
                    if (counter == 0) {
                        currElem = elem[counter].split(" ");
                        var m = _.map(currElem, function(elem2) {
                            return _.reduce(abrvMonthNames, function(memo,month) {
                                if (memo == month) {return abrvMonthNames.indexOf(month);} else {return memo}}, elem2);
                            });
                        date = new Date(vm.year,m[1],parseInt(m[2]));
                        //console.log(date);
                    }
                    if (counter == 1) {
                        currElem = elem[counter].replace(/ /g,'');
                        console.log(currElem);
                        if (currElem == "Lecture") {
                            color = "success";
                        }
                        if (currElem == "Discussion") {
                            color = "info";
                        }
                        if (currElem == "Workshop") {
                            color = "warning";
                        }
                        if (currElem == "Warning") {
                            color = "important";
                        }
                    }
                    if (counter == 2) {
                        currElem = elem[counter];
                        title = currElem;
                    }
                }
                obj =
                    {
                        title: title,
                        startsAt: date,
                        type: color,
                        draggable:true,
                        sizable:true
                    };
                calObj.push(obj);
                $scope.events.push(obj);
            }
        };

        this.parseCalendar("Resources/calendar-info.txt");


    }]);
})();