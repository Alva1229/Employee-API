
$.ajax({
    url: 'https://randomuser.me/api/?results=12&nat=us',
    dataType: 'json',
    success: function(data) {
      console.log(data.results);
      
      //Main Page
      let contents = data.results;

      for (let i = 0; i < contents.length; i++) {
        let image = contents[i].picture.large;
        let firstName = contents[i].name.first;
        let lastName = contents[i].name.last;
        let email = contents[i].email;
        let city = contents[i].location.city;

        document.getElementById('directory').innerHTML += `
        <ul class="employees">
          <li><img src='${image}' class="picture"></li>
          <li class="info">
            <p>
              <b>${firstName.charAt(0).toUpperCase() + firstName.slice(1)} ${lastName.charAt(0).toUpperCase() + lastName.slice(1)}</b><br />  
              <span class="email_city">${email}<br />
                ${city.charAt(0).toUpperCase() + city.slice(1)}
              </span>
            </p>
          </li>
        </ul>
        `;
      }
      
      //MODAL CONTENT

      var modal = document.getElementById('myModal');
      var modalBtn = document.getElementsByTagName('ul')[0];
      
      modalBtn.addEventListener('click', openModal);

      window.addEventListener('click', clickToClose);

      function openModal() {
        modal.style.display = 'block';
      }

      function closeModal() {
        modal.style.display = 'none';
        
      }

      function clickToClose(e) {
        if (e.target == modal) {
          modal.style.display = 'none';
        }
      }

      for (let i = 0; i < directory.children.length; i++) {
        directory.children[i].onclick = function () {
          modalBody(contents[i], i)
        }
      };

      let currentTarget = '';

      function modalBody(target) {
        openModal();
        currentTarget = contents.indexOf(target);
        let image = target.picture.large;
        let firstName = target.name.first;
        let lastName = target.name.last;
        let email = target.email;
        let cell = target.cell;
        let street = target.location.street;
        let city = target.location.city;
        let state = target.location.state;
        let postcode = target.location.postcode;
        let birthday = new Date(target.dob.date);
        birthday = birthday.toLocaleDateString(undefined, {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit'
      });
        
        document.getElementById('myModal').innerHTML += `
        <div class='modal-content'>
        <span class='close'>&times;</span>
        <a class='prevBtn'>&lt;</a>
        <a class='nextBtn'>&gt;</a>
        <ul id='container'>
        
        
        <li class=modal-li>
          <a><img class='picture-modal' src='${image}' alt='${firstName}'></a>
          <p class='name-modal'>${firstName.charAt(0).toUpperCase() + firstName.slice(1)} ${lastName.charAt(0).toUpperCase() + lastName.slice(1)}</p>
          <p class='email'>${email}</p>
          <p class='city'>${city.charAt(0).toUpperCase() + city.slice(1)}</p>
          <hr>
          <p class='cell'>${cell}</p>
          <p class='address'>${street}, ${state.charAt(0).toUpperCase() + state.slice(1)}, ${postcode}</p>
          <p class='birthday'>Birthday: ${birthday}</p>         
        </li>
        
      </ul>
      </div>
      
        `;
        // Get close button
      var closeBtn = document.getElementsByClassName('close')[0];
      closeBtn.addEventListener('click', closeModal);

      //Next and Previous
      var nextBtn = document.getElementsByClassName('nextBtn')[0];
      nextBtn.addEventListener('click', function(e){
        document.getElementById('myModal').innerHTML = '';
        if (contents.indexOf(contents[currentTarget + 1]) === -1) {
          modalBody(contents[0])
        } else {
          modalBody(contents[currentTarget + 1])
        }
        
      });

      var prevBtn = document.getElementsByClassName('prevBtn')[0];
      prevBtn.addEventListener('click', function(e){
      document.getElementById('myModal').innerHTML = '';
        if (currentTarget - 1 === -1) {
          modalBody(contents[contents.length - 1])
        } else {
          modalBody(contents[currentTarget - 1])
        }
       
      });

      }

    }
  });

  // Search //
$('#search').keyup(function () {

  let searchImages = $('#search').val();
  searchImages = searchImages.toLowerCase();

  let match = document.querySelectorAll('ul');
  for (i = 0; i < match.length; i++) {
    if (match[i].innerHTML.toLowerCase().includes(searchImages)) {
      match[i].style.display = 'flex';
    } else {
      match[i].style.display = 'none';
    }
  }
})
