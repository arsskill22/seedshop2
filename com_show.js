$('#comment-form').submit(function(event) {
    event.preventDefault();

    var username = $('#username').val();
    var comment = $('#comment').val();
    
    // Отправка POST запроса с комментариями
    $.ajax({
        url: 'https://c124-46-138-38-176.ngrok-free.app/', 
        method: 'POST',
        data: {
            username: username,
            comment: comment
        },
        success: function(response) {
            console.log('Ответ от сервера (POST):', response);
            loadComments();  // Загружаем комментарии после успешного POST запроса
            $('#comment-form')[0].reset();
        },
        error: function(xhr, status, error) {
            console.log('Ошибка при отправке комментария:', status, error);
        }
    });
});

function loadComments() {
    // GET запрос для загрузки комментариев
    $.ajax({
        url: 'https://c124-46-138-38-176.ngrok-free.app/',  // URL для получения комментариев
        method: 'GET',
        success: function(data) {
            console.log('Полученные данные от сервера (GET):', data);
            
            $('#comments-container').empty();  // Очищаем контейнер для комментариев

            // Проверяем, есть ли комментарии и выводим их
            if (data.comments && data.comments.length > 0) {
                data.comments.forEach(function(comment) {
                    var commentHTML = `
                        <div class="comment">
                            <strong>${comment.username}:</strong> <p>${comment.content}</p>
                        </div>
                    `;
                    $('#comments-container').append(commentHTML);
                });
            } else {
                $('#comments-container').append('<p>Комментариев нет.</p>');
            }
        },
        error: function(xhr, status, error) {
            console.log('Ошибка при загрузке комментариев:', status, error);
            $('#comments-container').append('<p>Ошибка загрузки комментариев. Попробуйте позже.</p>');
        }
    });
}

$(document).ready(function() {
    loadComments();  // Загружаем комментарии при загрузке страницы
});
