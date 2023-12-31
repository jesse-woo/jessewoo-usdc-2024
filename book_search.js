/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
 function findSearchTermInBooks(searchTerm, scannedTextObj) {
    /** You will need to implement your search and 
     * return the appropriate object here. */

    var result = {
        "SearchTerm": searchTerm,
        "Results": []
    };

    if (typeof searchTerm !== "string") {
        throw new Error("searchTerm must be a string.");
    }

    scannedTextObj.forEach(book => {
        if (Array.isArray(book.Content)) {
            book.Content.forEach(scan => {
                if (scan.Text && scan.Text.includes(searchTerm)) {
                    let resultObj = {
                        ISBN: book.ISBN,
                        Page: scan.Page,
                        Line: scan.Line
                    };
                    result.Results.push(resultObj);
                }
            })
        }
    })
    
    return result; 
}

/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    },
    {
        "Title": "A Fake Book for Tests",
        "ISBN": "1234567890",
        "Content": [
            {
                "Page": 10,
                "Line": 30,
                "Text": "Here lies search term foo"
            },
            {
                "Page": 11,
                "Line": 33,
                "Text": "Here lies search term bar"
            },
            {
                "Page": 21,
                "Line": 33,
                "Text": "Here lies search term foo a second time"
            },
            {
                "Page": 11,
                "Line": 33,
                "Text": "...bar is on this page and line twice that's weird."
            }
        ]
    }
]
    
/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** 1. We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** 2. We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}

// 3. Test exact match on case: "The" vs. "the".
const expectedTest3 = {
    "SearchTerm" : "The",
    "Results" : [
        {
            "ISBN": "9780000528531", 
            "Page": 31, 
            "Line": 8
        }
    ]
}
const test3result = findSearchTermInBooks("The", twentyLeaguesIn); 
if (test3result.Results.length == 1 && 
    test3result.Results[0].ISBN === expectedTest3.Results[0].ISBN &&
    test3result.Results[0].Page === expectedTest3.Results[0].Page &&
    test3result.Results[0].Line === expectedTest3.Results[0].Line) {
    console.log("PASS: Test 3");
} else {
    console.log("FAIL: Test 3");
    console.log("Expected:", expectedTest3);
    console.log("Received:", test3result);
}

/* 4. Test for match on a partial word. SearchTerm "moment" should return
matching line containing "momentum".
*/
const expectedTest4 = {
    "SearchTerm" : "moment",
    "Results" : [
        {
            "ISBN": "9780000528531", 
            "Page": 31, 
            "Line": 8
        }
    ]
}
const test4result = findSearchTermInBooks("moment", twentyLeaguesIn); 
if (test4result.Results.length == 1 && 
    test4result.Results[0].ISBN === expectedTest4.Results[0].ISBN &&
    test4result.Results[0].Page === expectedTest4.Results[0].Page &&
    test4result.Results[0].Line === expectedTest4.Results[0].Line) {
    console.log("PASS: Test 4");
} else {
    console.log("FAIL: Test 4");
    console.log("Expected:", expectedTest4);
    console.log("Received:", test4result);
}

// 5. Negative test, for no match.
const expectedTest5 = {
    "SearchTerm" : "Jesse",
    "Results" : [
        {
            "ISBN": "9780000528531", 
            "Page": 31, 
            "Line": 8
        }
    ]
}
const test5result = findSearchTermInBooks("Jesse", twentyLeaguesIn); 
if (test5result.Results.length == 0) {
    console.log("PASS: Test 5");
} else {
    console.log("FAIL: Test 5");
    console.log("Expected:", expectedTest5);
    console.log("Received:", test5result);
}

// 6. Test for non-string input type
try {
    const test6result = findSearchTermInBooks(10, twentyLeaguesIn); 
} catch (error) {
    if (error.message === "searchTerm must be a string.") {
    console.log("PASS: Test 6: Expected error was raised")
    } else {
        console.log("FAIL: Test 6, Raised the wrong error")
    }
}

// 7. Test book with no scans
const noScanInput = [
    {
        "Title": "Empty Book",
        "ISBN": "9876543210",
        "Content": [] 
    }
]
const expectedTest7 = {
    "SearchTerm" : "Jesse",
    "Results" : []
}
const test7result = findSearchTermInBooks("Jesse", noScanInput); 
if (JSON.stringify(test7result.Results) === "[]") {
    console.log("PASS: Test 7");
} else {
    console.log("FAIL: Test 7");
    console.log("Expected:", expectedTest7);
    console.log("Received:", test7result);
}

// 8. Test object with no books
const noBookInput = []
const expectedTest8 = {
    "SearchTerm" : "Jesse",
    "Results" : []
}
const test8result = findSearchTermInBooks("Jesse", noBookInput); 
if (JSON.stringify(test8result.Results) === "[]") {
    console.log("PASS: Test 8");
} else {
    console.log("FAIL: Test 8");
    console.log("Expected:", expectedTest8);
    console.log("Received:", test8result);
}

// 9. Test with scans but some data has null values
const nullValsInScan = [
    {
        "Title": "The Stranger",
        "ISBN": "678912345",
        "Content": [
            {
                "Page": 10,
                "Line": null,
                "Text": "Here lies search term foo"
            }
        ]
    }
]
const expectedTest9 = {
    "SearchTerm" : "foo",
    "Results" : [
        {
            "ISBN" : "678912345",
            "Page" : 10,
            "Line" : null
        }
    ]
}
const test9result = findSearchTermInBooks("foo", nullValsInScan); 
// Note that null and undefined are different types and could mess up this test if they are mixed.
if (JSON.stringify(expectedTest9.Results) === JSON.stringify(test9result.Results)) {
    console.log("PASS: Test 9");
} else {
    console.log("FAIL: Test 9");
    console.log("Expected:", expectedTest9);
    console.log("Received:", test9result);
}

// 10. Test when searchTerm foo shows up on different pages in same book
const expectedTest10 = {
    "SearchTerm" : "foo",
    "Results" : [
        {
            "ISBN" : "1234567890",
            "Page" : 10,
            "Line" : 30
        },
        {
            "ISBN" : "1234567890",
            "Page" : 21,
            "Line" : 33
        }
    ]
}
const test10result = findSearchTermInBooks("foo", twentyLeaguesIn); 
if (JSON.stringify(expectedTest10.Results) === JSON.stringify(test10result.Results)) {
    console.log("PASS: Test 10");
} else {
    console.log("FAIL: Test 10");
    console.log("Expected:", expectedTest10);
    console.log("Received:", test10result);
}

// 11. Test when searchTerm bar shows up twice in the same page and line
const expectedTest11 = {
    "SearchTerm" : "bar",
    "Results" : [
        {
            "ISBN" : "1234567890",
            "Page" : 11,
            "Line" : 33
        },
        {
            "ISBN" : "1234567890",
            "Page" : 11,
            "Line" : 33
        }
    ]
}
const test11result = findSearchTermInBooks("bar", twentyLeaguesIn); 
if (JSON.stringify(expectedTest11.Results) === JSON.stringify(test11result.Results)) {
    console.log("PASS: Test 11");
} else {
    console.log("FAIL: Test 11");
    console.log("Expected:", expectedTest11);
    console.log("Received:", test11result);
}
