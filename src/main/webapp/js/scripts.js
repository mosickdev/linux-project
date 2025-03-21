document.addEventListener('DOMContentLoaded', function() {
    // 헤더와 푸터 불러오기
    includeHTML('header.html', 'header-container');
    includeHTML('footer.html', 'footer-container');
    
    // 폼 요소 가져오기
    const form = document.getElementById('signupForm');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const name = document.getElementById('name');
    const phone = document.getElementById('phone');
    const termsAgree = document.getElementById('termsAgree');
    
    // 오류 메시지 요소 가져오기
    const usernameError = document.getElementById('usernameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const nameError = document.getElementById('nameError');
    const phoneError = document.getElementById('phoneError');
    const termsError = document.getElementById('termsError');
    
    const successMessage = document.getElementById('successMessage');
    
    // 비밀번호 토글 버튼
    const togglePassword = document.getElementById('togglePassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    
    // 파일을 불러와서 지정된 요소에 삽입하는 함수
    function includeHTML(file, targetId) {
        fetch(file)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`${file} 불러오기 오류: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                document.getElementById(targetId).innerHTML = data;
            })
            .catch(error => {
                console.error(`파일 로딩 오류 (${file}):`, error);
            });
    }
    
    // 비밀번호 표시/숨기기 토글 기능 (토글 버튼이 로드된 경우에만)
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
            password.setAttribute('type', type);
            this.textContent = type === 'password' ? '👁️' : '🔒';
        });
    }
    
    if (toggleConfirmPassword) {
        toggleConfirmPassword.addEventListener('click', function() {
            const type = confirmPassword.getAttribute('type') === 'password' ? 'text' : 'password';
            confirmPassword.setAttribute('type', type);
            this.textContent = type === 'password' ? '👁️' : '🔒';
        });
    }
    
    // 유효성 검사 함수
    function validateUsername(value) {
        const regex = /^[a-z0-9]{4,12}$/;
        return regex.test(value);
    }
    
    function validateEmail(value) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(value);
    }
    
    function validatePassword(value) {
        // 8자 이상, 영문 대소문자, 숫자, 특수문자 포함
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(value);
    }
    
    function validatePhone(value) {
        const regex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
        return regex.test(value);
    }
    
    // 폼 요소가 로드된 경우에만 이벤트 리스너 추가
    if (form) {
        // 실시간 유효성 검사
        username.addEventListener('input', function() {
            if (!validateUsername(this.value) && this.value !== '') {
                usernameError.style.display = 'block';
            } else {
                usernameError.style.display = 'none';
            }
        });
        
        email.addEventListener('input', function() {
            if (!validateEmail(this.value) && this.value !== '') {
                emailError.style.display = 'block';
            } else {
                emailError.style.display = 'none';
            }
        });
        
        password.addEventListener('input', function() {
            if (!validatePassword(this.value) && this.value !== '') {
                passwordError.style.display = 'block';
            } else {
                passwordError.style.display = 'none';
            }
            
            // 비밀번호 확인 필드가 비어있지 않은 경우 일치 여부 확인
            if (confirmPassword.value !== '') {
                if (this.value !== confirmPassword.value) {
                    confirmPasswordError.style.display = 'block';
                } else {
                    confirmPasswordError.style.display = 'none';
                }
            }
        });
        
        confirmPassword.addEventListener('input', function() {
            if (this.value !== password.value) {
                confirmPasswordError.style.display = 'block';
            } else {
                confirmPasswordError.style.display = 'none';
            }
        });
        
        name.addEventListener('input', function() {
            if (this.value === '') {
                nameError.style.display = 'block';
            } else {
                nameError.style.display = 'none';
            }
        });
        
        phone.addEventListener('input', function() {
            // 자동으로 하이픈 추가
            let phoneValue = this.value.replace(/[^0-9]/g, '');
            if (phoneValue.length > 3 && phoneValue.length <= 7) {
                phoneValue = phoneValue.substring(0, 3) + '-' + phoneValue.substring(3);
            } else if (phoneValue.length > 7) {
                phoneValue = phoneValue.substring(0, 3) + '-' + phoneValue.substring(3, 7) + '-' + phoneValue.substring(7, 11);
            }
            this.value = phoneValue;
            
            if (!validatePhone(this.value) && this.value !== '') {
                phoneError.style.display = 'block';
            } else {
                phoneError.style.display = 'none';
            }
        });
        
        termsAgree.addEventListener('change', function() {
            if (!this.checked) {
                termsError.style.display = 'block';
            } else {
                termsError.style.display = 'none';
            }
        });
        
        // 폼 제출 처리
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // 모든 필드 유효성 검사
            if (!validateUsername(username.value)) {
                usernameError.style.display = 'block';
                isValid = false;
            }
            
            if (!validateEmail(email.value)) {
                emailError.style.display = 'block';
                isValid = false;
            }
            
            if (!validatePassword(password.value)) {
                passwordError.style.display = 'block';
                isValid = false;
            }
            
            if (password.value !== confirmPassword.value) {
                confirmPasswordError.style.display = 'block';
                isValid = false;
            }
            
            if (name.value === '') {
                nameError.style.display = 'block';
                isValid = false;
            }
            
            if (!validatePhone(phone.value)) {
                phoneError.style.display = 'block';
                isValid = false;
            }
            
            if (!termsAgree.checked) {
                termsError.style.display = 'block';
                isValid = false;
            }
            
            if (isValid) {
                // 폼 데이터 수집
                const userData = {
                    username: username.value,
                    email: email.value,
                    password: password.value,
                    name: name.value,
                    phone: phone.value
                };
                
                // 여기서 서버로 데이터를 전송하는 코드가 들어갈 수 있음
                console.log('회원가입 데이터:', userData);
                
                // 성공 메시지 표시
                form.style.display = 'none';
                successMessage.style.display = 'block';
                
                // 실제 구현에서는 서버 응답에 따라 처리
                // fetch('/api/signup', {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json'
                //     },
                //     body: JSON.stringify(userData)
                // })
                // .then(response => response.json())
                // .then(data => {
                //     if(data.success) {
                //         form.style.display = 'none';
                //         successMessage.style.display = 'block';
                //     } else {
                //         alert(data.message || '회원가입 중 오류가 발생했습니다.');
                //     }
                // })
                // .catch(error => {
                //     console.error('Error:', error);
                //     alert('회원가입 중 오류가 발생했습니다.');
                // });
            }
        });
    }
});