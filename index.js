

function createEmployeeRecord(array) {
    let Employee = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return Employee
}

function createEmployeeRecords(array) {
    return array.map(rec => createEmployeeRecord(rec))
}

function createTimeInEvent(record, date) {
    let splitDate = date.split(" ")
    let inEvent = {
        type: 'TimeIn',
        date: splitDate[0],
        hour: parseInt(splitDate[1])
    }
    record.timeInEvents.push(inEvent)
    return record
}

function createTimeOutEvent(record, date) {
    let splitDate = date.split(" ")
    let outEvent = {
        type: 'TimeOut',
        date: splitDate[0],
        hour: parseInt(splitDate[1])
    }
    record.timeOutEvents.push(outEvent)
    return record
}

function hoursWorkedOnDate(record, date) {
  let inEvent = record.timeInEvents.find(inEvent => inEvent.date === date)
  let outEvent = record.timeOutEvents.find(outEvent => outEvent.date === date)
  return (outEvent.hour - inEvent.hour) / 100
}

function wagesEarnedOnDate(record, date) {
    return hoursWorkedOnDate(record, date) * record.payPerHour
}

function allWagesFor(record) {
    let sum = 0;
    for(let i = 0; i < record.timeInEvents.length; i++) {
        const wagesPerDate = wagesEarnedOnDate(record, record.timeInEvents[i].date)
        sum += wagesPerDate
    }
    return sum
}

function calculatePayroll(employees) {
    let sum = 0
    employees.forEach(employee => {
        sum += allWagesFor(employee)
    })
    return sum

}



