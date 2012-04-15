var gitoscop = gitoscop ? gitoscop : {'mock': {}}

gitoscop.mock.commits = [
    {
        "author": {
            "avatar_url": "https://secure.gravatar.com/avatar/d59bdceef864e67df13167d806d6da63?d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-140.png",
            "login": "Author 1",
            "url": "https://api.github.com/users/author1",
            "gravatar_id": "d59bdceef864e67df13167d806d6da63",
            "id": 46647
        },
        "url": "https://api.github.com/repos/e2e/test/commits/15c1fe392942b70e456f10afbdfd9c3329249a43",
        "sha": "15c1fe392942b70e456f10afbdfd9c3329249a43",
        "commit": {
            "message": "refactor(ngView): remove extra $watch, refactor one ugly test",
            "author": {
                "email": "vojta.jina@gmail.com",
                "name": "Vojta Jina",
                "date": "2012-03-30T15:03:20-07:00"
            },
            "url": "https://api.github.com/repos/e2e/test/git/commits/15c1fe392942b70e456f10afbdfd9c3329249a43",
            "tree": {
                "url": "https://api.github.com/repos/e2e/test/git/trees/bec93d124ab8bc1cbd283e250be5b037bcc1fce7",
                "sha": "bec93d124ab8bc1cbd283e250be5b037bcc1fce7"
            },
            "committer": {
                "email": "vojta.jina@gmail.com",
                "name": "Vojta Jina",
                "date": "2012-04-03T10:10:44-07:00"
            }
        },
        "committer": {
            "avatar_url": "https://secure.gravatar.com/avatar/d59bdceef864e67df13167d806d6da63?d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-140.png",
            "login": "vojtajina",
            "url": "https://api.github.com/users/vojtajina",
            "gravatar_id": "d59bdceef864e67df13167d806d6da63",
            "id": 46647
        }
    },
    {
        "author": {
            "avatar_url": "https://secure.gravatar.com/avatar/d59bdceef864e67df13167d806d6da63?d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-140.png",
            "login": "vojtajina",
            "url": "https://api.github.com/users/vojtajina",
            "gravatar_id": "d59bdceef864e67df13167d806d6da63",
            "id": 46647
        },
        "url": "https://api.github.com/repos/e2e/test/commits/428f2b563663315df4f235ca19cef4bdcf82e2ab",
        "sha": "428f2b563663315df4f235ca19cef4bdcf82e2ab",
        "commit": {
            "message": "feat(ngInclude): allow ngInclude on css class\n\nAnd make it terminal so that it does not compile its content, which would cause leaks.",
            "author": {
                "email": "vojta.jina@gmail.com",
                "name": "Author 2",
                "date": "2012-03-30T13:55:33-07:00"
            },
            "url": "https://api.github.com/repos/e2e/test/git/commits/428f2b563663315df4f235ca19cef4bdcf82e2ab",
            "tree": {
                "url": "https://api.github.com/repos/e2e/test/git/trees/0e9d60777ced649d8fcf3357ac8456c029b99ec5",
                "sha": "0e9d60777ced649d8fcf3357ac8456c029b99ec5"
            },
            "committer": {
                "email": "vojta.jina@gmail.com",
                "name": "Vojta Jina",
                "date": "2012-04-03T10:10:44-07:00"
            }
        },
        "committer": {
            "avatar_url": "https://secure.gravatar.com/avatar/d59bdceef864e67df13167d806d6da63?d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-140.png",
            "login": "vojtajina",
            "url": "https://api.github.com/users/vojtajina",
            "gravatar_id": "d59bdceef864e67df13167d806d6da63",
            "id": 46647
        }
    }]


gitoscop.mock.commitsById = {
    "15c1fe392942b70e456f10afbdfd9c3329249a43": {
        "sha": "15c1fe392942b70e456f10afbdfd9c3329249a43",
        "author": {login: "Author 1"},
        "files": [
            {"filename": "F 1.1", "status": "modified", "patch": "+++ bla bla bla"},
            {"filename": "F 1.2", "status": "modified", "patch": "---"}
        ],
        "commit": {author: {"name": "Author 1"}}
    },
    "428f2b563663315df4f235ca19cef4bdcf82e2ab": {
        "sha": "428f2b563663315df4f235ca19cef4bdcf82e2ab",
        "author": {login: "Author 2"},
        "files": [{"filename": "F 2.1", "status": "added", "patch": "++++ trololo"}],
        "commit": {author: {"name": "Author 2"}}
    }
}