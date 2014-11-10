function Router() {
    this.views = {
        '/create_test': {
            trigger: document.getElementById('a_create_test'),
            element: document.getElementById('create_test_container'),
            init: [],
            unload: []
        },
        '/show_tests': {
            trigger: document.getElementById('a_show_tests'),
            element: document.getElementById('show_tests_container'),
            init: [],
            unload: []
        },
        '/show_testsHTML5': {
            trigger: document.getElementById('a_show_testsHTML5'),
            element: document.getElementById('show_tests_container'),
            init: [],
            unload: []
        },
        '/show_testsJavaScript': {
            trigger: document.getElementById('a_show_testsJavaScript'),
            element: document.getElementById('show_tests_container'),
            init: [],
            unload: []
        },
        '/show_testsCSS3': {
            trigger: document.getElementById('a_show_testsCSS3'),
            element: document.getElementById('show_tests_container'),
            init: [],
            unload: []
        }

    };

    this.path = '/create_test';

    var self = this;

    this.show = function (path) {
        console.log("this.show = function(path)");
        this.path = path;
        // hide all views
        for ( var view in self.views ) {
            self.views[view].unload.forEach(function (fn) {
                fn();
            });
            self.views[view].element.style.display = 'none';
        }
        console.log(path);
        // show current view
        console.log(self.views[path]);
        self.views[path].element.style.display = 'block';
    };

    for ( var view in self.views ) {
        console.log(view);
        console.log(self.views[view]);
        self.views[view].element.style.display = 'none';
        self.views[view].trigger.addEventListener('click', function (event) {
            event.preventDefault();
            console.log(/\/#(\/.+)/gmi.exec(this.href));
            var path = /\/#(\/.+)/gmi.exec(this.href)[1];
            self.show(path);
            self.views[path].init.forEach(function (fn) {
                fn();
            });
        });
    }


    // todo: to be removed prior prod
    self.views['/show_tests'].element.style.display = 'block';

}



var router = new Router();

// add by me for testing
router.views['/show_tests'].init.push(function (){
    console.log("I am initializing the show_tests page");
});

/*router.views['/show_tests'].init.push(function () {
    // get all the tests from the backend and display it

    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/tests');
    xhr.addEventListener('readystatechange', function () {
        if ( xhr.status === 200 && xhr.readyState === 4 ) {
            var data = JSON.parse(xhr.responseText);
            for (var i = data.length - 1; i > -1; i--) {
                document.getElementById('show_tests_container').appendChild(createTestDivElement(data[i]));
            }
            console.log(data[0]);
        }


    });
    xhr.send();

});*/

router.views['/show_tests'].unload.push(function () {
    router.views['/show_tests'].element.innerHTML = '';
});

// console.log(router.views);


function createTestDivElement(test) {
    console.log("I am here but it is going to give me an error later");
    var container = createElement('div', 'test', '');
    container.setAttribute('data-id', test._id);
    container.setAttribute('data-priority', test.priority);
    var selected = ['description', 'status', 'tags', 'notes'];
    for ( var i = 0; i < selected.length; i++ ) {
        var prop = selected[i];
        var row = createElement('div', 'test_row', '', container);
        createElement('span', 'data', test[prop], row);
        createElement('span', 'caption', prop, row);
    }
    var icons = createElement('div', 'icons', '', container);
    createElement('i', 'fa fa-times', '', icons).addEventListener('click', function (event) {
        var testdiv = this.parentNode.parentNode;
        this.className = 'fa fa-spinner spin';
        var xhr = new XMLHttpRequest();
        xhr.open('DELETE', '/tests/' + testdiv.dataset.id);
        xhr.addEventListener('readystatechange', function () {
            if ( xhr.status === 200 && xhr.readyState === 4 ) {
                testdiv.parentNode.removeChild(testdiv);
            }
        });
        xhr.send();
    });
    return container;
}

function createElement(type, className, innerHTML, parent) {
    var element = document.createElement(type);
    element.className = className;
    element.innerHTML = innerHTML;
    if ( typeof parent !== 'undefined' ) parent.appendChild(element);
    return element;
}

// Submit the newly created question from the input form to the database
document.getElementById('a_create_server_tests').addEventListener('click', createServerTest);

function createServerTest() {

    // get the drop-down menu types of test that the user has selected
    var x = document.getElementById("test_selections").selectedIndex;
    var testType = document.getElementsByTagName("option")[x].innerHTML;

    // get the form from the document object model
    var form = document.getElementById("form_test");


    // get all data from form
    var test_object = {
        testName: testType,
        question: form.elements['question'].value,
        correctAnswer: form.elements['correctAnswer'].value,
       // wrongAnswers: ['form.elements['wrongAnswer1'].value', form.elements['wrongAnswer2'].value, form.elements['wrongAnswer3'].value]
    };

    // test all the values
    console.log(testType);
    console.log(form.elements['correctAnswer'].value);
    console.log(form.elements['question'].value);
    console.log(form.elements['correctAnswer'].value);
    console.log(form.elements['wrongAnswer1'].value);
    console.log(form.elements['wrongAnswer2'].value);
    console.log(form.elements['wrongAnswer3'].value);


    console.log(test_object);

    // make a post call
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/tests');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.addEventListener('readystatechange', function () {
        if ( xhr.status === 200 && xhr.readyState === 4 ) {
            var data = JSON.parse(xhr.responseText);
            // show confirmation to client
            console.log(data);
        }
    });
    xhr.send(JSON.stringify(test_object));


}


/*document.getElementById('dummytest').addEventListener('click', function () {
    var spans = this.getElementsByClassName('data');
    for (var i = 0, len = spans.length; i < len; i++) {
        spans[i].setAttribute('contenteditable', 'true');
    }
});*/

