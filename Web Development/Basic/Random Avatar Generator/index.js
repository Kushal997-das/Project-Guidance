function getRandomCharacter() {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 4; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
  
  function getRandomGender() {
    return Math.random() < 0.5 ? 'boy' : 'girl';
  }
  
  function generateAvatar() {
    const gender = getRandomGender();
    const username = getRandomCharacter();
    return `https://avatar.iran.liara.run/public/${gender}?username=${username}`;
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    const avatarImg = document.getElementById('avatar');
    const regenerateBtn = document.getElementById('regenerate-btn');
  
    function updateAvatar() {
      avatarImg.src = generateAvatar();
    }
  
    // Initialize with a random avatar
    updateAvatar();
  
    // Regenerate avatar on button click
    regenerateBtn.addEventListener('click', updateAvatar);
  });
  