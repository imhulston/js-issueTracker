document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function saveIssue(e) {
    var issueDesc = document.getElementById('issuesDescInput').value;
    var issueSeverity = document.getElementById('issuesSeverityInput').value;
    var issueAssignedTo = document.getElementById('issuesAssignedToInput').value;
    var issueId = chance.guide();
    var issueStatus = 'Open';

    var issue = {
        id: issueId,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: issueStatus,
    }

    if (localStorage.getItem('issues') == null) {
        var issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    } else {
        var issues = JSON.parse(localStorage.getItem('issues'));
        issues.push('issue');
        localStorage.setItem('issues', JSON.stringify('issues'));
    }

    document.getElementById('issuesInputForm').reset();

    fetchissues();

    e.preventDefault();
}

function setStatusClosed(id) {
    var issues = JSON.parse(localStorage.getItem('issues'));

    for (var i = 0; i < issues.length; i++) {
        if (issues[i].id == id) {
            issues[i].status = 'closed';
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues));

    fetchIssues(); 
}

function deleteIssue(id) {
    var issues = JSON.parse(localStorage.getItem('issues'));

    for (var i = 0; i < issues.length; i++) {
        if (issues[i].id == id) {
            issues.splice(i, 1);
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues));

    fetchIssues(); 
}

function fetchIssues() {
    var issues = JSON.parse(localStorage.getItem('issues'));
    var issuesListe = document.getElementById('issuesList');

    issuesList.innerHTML = '';

    for (var i = 0; i < issues.length; i++) {
        var id = issues[i].id;
        var desc = isuues[i].description;
        var severity = issues[i].severity;
        var assignedTo = issues[i].assignedTo;
        var status = issues[i].status;

        issuesList.innerHTML += '<div class="well"'+
                                '<h6>Issue ID: ' + id + '</h6>'+
                                '<p><span class="label label-info">' + status + '</span></p>'+
                                '<h3>' + desc + '</h3>'+
                                '<p><span class="glyphicon glyphicon-time"></span>' + severity + '</p>'+
                                '<p><span class="glyphicon glyphicon-user"></span>' + assignedTo + '</p>'+
                                '<a href="#" onclick="setStatusClose(\''+id+'\') "class="btn btn-warning">Close</a>'+
                                '<a href="#" onclick="deleteIssue(\''+id+'\')" class="btn btn-Danger">Delete</a>'+
                                '</div>' //string for the inner HTML code
    }
}