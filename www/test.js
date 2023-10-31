$(document).ready(function() {
    // Retrieve items on page load
    retrieveItems();
  
    // Handle form submission
    $('#addItemForm').submit(function(event) {
      event.preventDefault();
      var name = $('#name').val();
      var description = $('#description').val();
  
      addItem(name, description);
    });
  
    // Retrieve items from the server
    function retrieveItems() {
      $.get('/api/items', function(data) {
        $('#itemsTable tbody').empty();
        for (var i = 0; i < data.length; i++) {
          var item = data[i];
          var row = '<tr>' +
                    '<td>' + item.name + '</td>' +
                    '<td>' + item.description + '</td>' +
                    '<td>' +
                    '<button class="editButton" data-id="' + item._id + '">Edit</button> ' +
                    '<button class="deleteButton" data-id="' + item._id + '">Delete</button>' +
                    '</td>' +
                    '</tr>';
          $('#itemsTable tbody').append(row);
        }
      });
    }
  
    // Add a new item
    function addItem(name, description) {
      $.post('/api/items', { name: name, description: description }, function(data) {
        $('#name').val('');
        $('#description').val('');
        retrieveItems();
      });
    }
  
    // Edit an existing item
    $(document).on('click', '.editButton', function() {
      var itemId = $(this).data('id');
      var newName = prompt('Enter the new name:');
      if (newName) {
        $.ajax({
          url: '/api/items/' + itemId,
          method: 'PUT',
          data: { name: newName },
          success: function() {
            retrieveItems();
          }
        });
      }
    });
  
    // Delete an item
    $(document).on('click', '.deleteButton', function() {
      var itemId = $(this).data('id');
      if (confirm('Are you sure you want to delete this item?')) {
        $.ajax({
          url: '/api/items/' + itemId,
          method: 'DELETE',
          success: function() {
            retrieveItems();
          }
        });
      }
    });
  });
  