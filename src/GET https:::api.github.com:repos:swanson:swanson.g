GET https://api.github.com/repos/swanson/swanson.github.com/git/blobs/0ce0259a52b0df0d31441764ed6f690bff75c91c
Accept: application/vnd.github-blob.raw




    $.ajax('https://api.github.com/repos/seung/try_git/git/blobs/0ce0259a52b0df0d31441764ed6f690bff75c91c', {
    Accept: 'application/vnd.github-blob.raw',
    //contentType: 'application/vnd.github-blob.raw',
    data: {},
    success: function(data){
      var result = data
    },
    error: function(data) {
      console.log('error')
      $('#error').prepend(' oh no').append('!');
    }
  });