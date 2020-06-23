$(document).ready(function () {
  $('.arrive-table-section__add').click(function () {
    var day = $(this).attr('class').split(' ')[1];

    $('#volunteer-day option[value="' + day + '"]').prop('selected', true);

    console.log($('#volunteer-day option[value="' + day + '"]'));
  });
});

var dataController = (function () {
  var Person = function (firstName, lastName, time) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.time = time;
  };

  var data = {
    allItems: {
      monday: [],
      friday: [],
      saturday: [],
    },
  };

  return {
    addItem: function (type, firstName, lastName, time) {
      var newItem;

      newItem = new Person(firstName, lastName, time);
      console.log(newItem);
      data.allItems[type].push(newItem);

      return newItem;
    },
  };
})();

var UIController = (function () {
  var DOMstrings = {
    inputVolunteerDay: '#volunteer-day',
    inputFirstName: '.first_name',
    inputLastName: '.last_name',
    inputTimeOfArrival: '.time_arrival',
    formButton: '.btn',
    sideNav: '.sidenav',
    dateLable: '.arrive-table-section_date',
    daysSelector: '.daysSelector',
  };

  return {
    getInput: function () {
      return {
        volunteerDay: document.querySelector(DOMstrings.inputVolunteerDay)
          .value,
        firstName: document.querySelector(DOMstrings.inputFirstName).value,
        lastName: document.querySelector(DOMstrings.inputLastName).value,
        timeOfArrival: document.querySelector(DOMstrings.inputTimeOfArrival)
          .value,
      };
    },
    getDOMstring: function () {
      return DOMstrings;
    },

    addPersonItem: function (obj, dayOfArrival) {
      var html, newHtml;

      element = html =
        '<div><div class="person">%name%</div><button>Delete</button><<div>';

      newHtml = html.replace('%name%', obj.firstName + obj.lastName);

      document
        .querySelector(`.` + dayOfArrival)
        .insertAdjacentHTML('afterbegin', newHtml);
    },

    clearFields: function () {
      var fields, fieldsArray;

      fields = document.querySelectorAll(
        DOMstrings.inputVolunteerDay +
          ',' +
          DOMstrings.inputFirstName +
          ',' +
          DOMstrings.inputLastName +
          ',' +
          DOMstrings.inputTimeOfArrival
      );

      fieldsArray = Array.prototype.slice.call(fields);

      fieldsArray.forEach(function (current, index, array) {
        current.value = '';
      });
    },

    displayDate: function () {
      var curr, first, last, firstDay, lastDay, newLastDay, newFirstDay;

      curr = new Date(); // get current date
      first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
      last = first + 6; // last day is the first day + 6
      firstDay = new Date(curr.setDate(first)).toUTCString();
      lastDay = new Date(curr.setDate(curr.getDate() + 6)).toUTCString();
      newFirstDay = firstDay.split(' ');
      newLastDay = lastDay.split(' ');

      dateToDispalay =
        newFirstDay[1] +
        '/' +
        newFirstDay[2] +
        '-' +
        newLastDay[1] +
        '/' +
        newLastDay[2];

      document.querySelector(DOMstrings.dateLable).textContent = dateToDispalay;
    },
  };

  //31/May - 06/Jun
})();

var controller = (function (dataCtrl, UICtrl) {
  var setupEventListeners = function () {
    var DOM = UIController.getDOMstring();

    // document
    //   .querySelector(DOM.formButton)
    //   .addEventListener("click", ctrlAddItem);

    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll(DOM.sideNav);
      var options = {
        edge: 'right',
      };
      var instances = M.Sidenav.init(elems, options);
    });

    UICtrl.displayDate();
  };

  var ctrlAddItem = function () {
    var inputFromForm, newItem;

    //Get the fielt input data
    inputFromForm = UICtrl.getInput();

    if (
      inputFromForm.firstName.value !== '' &&
      inputFromForm.lastName.value !== '' &&
      inputFromForm.volunteerDay.value !== ''
    ) {
      //Add the item to the budget controller
      newItem = dataCtrl.addItem(
        inputFromForm.volunteerDay,
        inputFromForm.firstName,
        inputFromForm.lastName,
        inputFromForm.timeOfArrival
      );

      //Add the item to the UI
      UICtrl.addPersonItem(newItem, inputFromForm.volunteerDay);

      //clear the fields
      UICtrl.clearFields();
    }
  };

  return {
    init: function () {
      setupEventListeners();
      //setupWhoWalkedThisWeekBoard();
    },
  };
})(dataController, UIController);

controller.init();
