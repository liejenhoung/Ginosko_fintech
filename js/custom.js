var gauge1;
var gauge2;
var gauge3;
var table;
var scale = 1000000;
var result = [];
var nextRecordID;

var config1 = liquidFillGaugeDefaultSettings();
config1.circleThickness = 0.4;
config1.circleColor = "#00C851";
config1.textColor = "#007E33";
config1.waveTextColor = "#c5e1a5";
config1.waveColor = "#00C851";
config1.textVertPosition = 0.52;
config1.waveAnimateTime = 5000;
config1.waveHeight = 0.08;
config1.waveAnimate = true;
config1.waveCount = 1.5;
config1.waveOffset = 0.25;
config1.textSize = 0.8;
config1.minValue = 0;
config1.maxValue = 150;
config1.displayPercent = false;

var config2 = liquidFillGaugeDefaultSettings();
config2.circleThickness = 0.4;
//config2.circleColor = "#6DA398";
//config2.textColor = "#0E5144";
//config2.waveTextColor = "#6DA398";
//config2.waveColor = "#246D5F";
config2.textVertPosition = 0.52;
config2.waveAnimateTime = 5000;
config2.waveHeight = 0.08;
config2.waveAnimate = true;
config2.waveCount = 1.5;
config2.waveOffset = 0.25;
config2.textSize = 0.8;
config2.minValue = 0;
config2.maxValue = 150;
config2.displayPercent = false;

var config3 = liquidFillGaugeDefaultSettings();
config3.circleThickness = 0.4;
config3.circleColor = "#ff4444";
config3.textColor = "#CC0000";
config3.waveTextColor = "#ffcdd2";
config3.waveColor = "#ff4444";
config3.textVertPosition = 0.52;
config3.waveAnimateTime = 5000;
config3.waveHeight = 0.08;
config3.waveAnimate = true;
config3.waveCount = 1.5;
config3.waveOffset = 0.25;
config3.textSize = 0.8;
config3.minValue = 0;
config3.maxValue = 150;
config3.displayPercent = false;

//var gauge1 = loadLiquidFillGauge("fillgauge1", 80, config1);
//var gauge2 = loadLiquidFillGauge("fillgauge2", 120, config2);
//var gauge3 = loadLiquidFillGauge("fillgauge3", 40, config3);

$(document).ready(function() {
    nextRecordID = dataAll.length + 1;
    var i = 0,
        result = [];
    while (i < dataAll.length) {
        result.push([]);
        //alert("Hi"+JSON.stringify(dataall[i], null, 4));
        for (var key in dataAll[i]) {
            result[result.length - 1].push(dataAll[i][key]);
        }
        //alert("Hi"+JSON.stringify(result[i], null, 4));
        i++;
    }
    var total_premium = 3134000;
    var total_claims = 1604000;
    var total_residual = 1530000;
    total_premium = 0;
    total_claims = 0;
    total_residual = 0;
    for (k = 0; k < result.length; k++) {
        if (result[k][4] == 'Premium') {
            total_premium += result[k][6];
            //total_residual += result[k][6];
        } else if (result[k][4] == 'Claims') {
            total_claims += result[k][6];
            //total_residual -= result[k][6];
        }
    }
    total_residual = total_premium - total_claims;
    //alert(total_premium + " " + total_claims + " " + total_residual);

    config1.maxValue = total_premium / scale;
    config2.maxValue = total_premium / scale;
    config3.maxValue = total_premium / scale;
    gauge1 = loadLiquidFillGauge("fillgauge1", total_residual / scale, config1);
    gauge2 = loadLiquidFillGauge("fillgauge2", total_premium / scale, config2);
    gauge3 = loadLiquidFillGauge("fillgauge3", total_claims / scale, config3);

    table = $('#example').DataTable({
        data: result,
        columns: [{
            title: "Record"
        }, {
            title: "Time"
        }, {
            title: "Insurer ID"
        }, {
            title: "Contract ID"
        }, {
            title: "Event"
        }, {
            title: "Disease"
        }, {
            title: "Amount"
        }, {
            title: "Residual"
        }],
        "order": [
            [0, "desc"]
        ]
    });

    // Hide residual
    table.column(7).visible(false);

});

function buttonClicked(source) {
    var dataSource;
    switch (source) {
        case 'All':
            dataSource = dataAll;
            break;
        case 'Cancer':
            dataSource = dataCancer;
            break;
        case 'HA':
            dataSource = dataHA;
            break;
        case 'Stroke':
            dataSource = dataStroke;
            break;
        case 'Kidney':
            dataSource = dataKidney;
            break;
        default:
            alert("Shit");
    }

    var i = 0,
        result = [];
    while (i < dataSource.length) {
        result.push([]);
        for (var key in dataSource[i]) {
            result[result.length - 1].push(dataSource[i][key]);
        }
        i++;
    }
    var total_premium = 0;
    var total_claims = 0;
    var total_residual = 0;
    for (k = 0; k < result.length; k++) {
        if (result[k][4] == 'Premium') {
            total_premium += result[k][6];
        } else if (result[k][4] == 'Claims') {
            total_claims += result[k][6];
        }

    }
    total_residual = total_premium - total_claims;
    //alert(total_premium + " " + total_claims + " " + total_residual);
    gauge1.update(total_residual / scale);
    gauge2.update(total_premium / scale);
    gauge3.update(total_claims / scale);

    table.destroy();

    table = $('#example').DataTable({
        data: result,
        columns: [{
            title: "Record"
        }, {
            title: "Time"
        }, {
            title: "Insurer ID"
        }, {
            title: "Contract ID"
        }, {
            title: "Event"
        }, {
            title: "Disease"
        }, {
            title: "Amount"
        }, {
            title: "Residual"
        }],
        "order": [
            [0, "desc"]
        ]
    });

    // Hide residual
    table.column(7).visible(false);

}

function purchaseClicked(source) {
    var dataSource;
    var insuranceType;
	var premiumAmount;
    switch (source) {
        case 'Cancer':
            dataSource = dataCancer;
            insuranceType = 'Cancer';
			premiumAmount = $( "#range1" ).text();
            break;
        case 'HA':
            dataSource = dataHA;
            insuranceType = 'Heart Attack';
			premiumAmount = $( "#range5" ).text();
            break;
        case 'Stroke':
            dataSource = dataStroke;
            insuranceType = 'Stroke';
			premiumAmount = $( "#range3" ).text();
            break;
        case 'Kidney':
            dataSource = dataKidney;
            insuranceType = 'Kidney Failure';
			premiumAmount = $( "#range7" ).text();
            break;
        default:
            alert("Shit");
    }
    var newRecord = {
        "Record": nextRecordID++,
        "Time": "19/6/2018 12:50",
        "Insurer ID": 142,
        "Contract ID": 1,
        "Event": "Premium",
        "Disease": insuranceType,
        "Amount": premiumAmount,
        "Residue": 1530000
    };

    dataSource = dataAll;

    var i = 0,
        result = [];
    while (i < dataSource.length) {
        result.push([]);
        for (var key in dataSource[i]) {
            result[result.length - 1].push(dataSource[i][key]);
        }
        i++;
    }
    result.push([]);
    for (var key in newRecord) {
        result[result.length - 1].push(newRecord[key]);
    }

    var total_premium = 0;
    var total_claims = 0;
    var total_residual = 0;
    for (k = 0; k < result.length; k++) {
        if (result[k][4] == 'Premium') {
            total_premium += result[k][6];
        } else if (result[k][4] == 'Claims') {
            total_claims += result[k][6];
        }

    }
    total_residual = total_premium - total_claims;
    //alert(total_premium + " " + total_claims + " " + total_residual);
	/*var tempnum = (total_residual / scale);
	tempnum = tempnum.toFixed(2);
	gauge1.update( tempnum );
	var tempnum = (total_premium / scale);
	tempnum = tempnum.toFixed(2);
	gauge2.update( tempnum );
	var tempnum = (total_claims / scale);
	tempnum = tempnum.toFixed(2);
	gauge3.update( tempnum );*/
    //gauge1.update( (total_residual / scale).toFixed(2) );
    //gauge2.update( (total_premium / scale).toFixed(2) );
    //gauge3.update( (total_claims / scale).toFixed(2) );

    table.destroy();

    table = $('#example').DataTable({
        data: result,
        columns: [{
            title: "Record"
        }, {
            title: "Time"
        }, {
            title: "Insurer ID"
        }, {
            title: "Contract ID"
        }, {
            title: "Event"
        }, {
            title: "Disease"
        }, {
            title: "Amount"
        }, {
            title: "Residual"
        }],
        "order": [
            [0, "desc"]
        ]
    });

    // Hide residual
    table.column(7).visible(false);

}



function showValue1(newValue) {
    document.getElementById("range1").innerHTML = newValue;
    document.getElementById("range2").innerHTML = newValue * 3;
}

function showValue2(newValue) {
    document.getElementById("range3").innerHTML = newValue;
    document.getElementById("range4").innerHTML = newValue * 2.5;
}

function showValue3(newValue) {
    document.getElementById("range5").innerHTML = newValue;
    document.getElementById("range6").innerHTML = newValue * 3.8;
}

function showValue4(newValue) {
    document.getElementById("range7").innerHTML = newValue;
    document.getElementById("range8").innerHTML = newValue * 4.3;
}