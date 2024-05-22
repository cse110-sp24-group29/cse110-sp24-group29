class NavbarComponent extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      console.log('Navbar component constructor called');
    }
  
    connectedCallback() {
      console.log('Navbar component connected');
      this.render();
      this.addEventListeners();
    }
  
    render() {
      console.log('Navbar component render method called');
      this.shadowRoot.innerHTML = `
        <style>
          * {
            font-family: 'Montserrat', sans-serif;
          }

          nav {
            background-color: none;
            color: black;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 20px;
            box-sizing: border-box;
          }
  
          nav .logo img {
            height: 80px;
          }
  
          nav .hamburger {
            display: flex;
            cursor: pointer;
            flex-direction: column;
          }
  
          nav .hamburger .line {
            background-color: black;
            height: 2px;
            width: 25px;
            margin: 4px 0;
            transition: 0.3s ease-in-out;
          }
  
          .nav-links {
            position: fixed;
            top: 50;
            right: -100px;
            /* starts the nav links hidden off-screen */
            height: 100%;
            width: 100px;
            background-color: none;
            transition: right 0.3s ease-in-out;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
  
          .nav-links div {
            padding: 10px;
            text-align: center;
            width: 100%;
          }
  
          .nav-links div a {
            color: black;
            text-decoration: none;
            display: block;
          }
  
          .nav-links.active {
            right: 0;
          }
  
          .nav-links div a:hover {
            color: #aaa;
          }
        </style>
        <nav>
          <div class="logo">
            <img src="admin/branding/Logo1.png" alt="Logo" height="50" />
          </div>
          <h1 class="nav-title">Software Surfers: Developer Journal</h1>
          <div class="hamburger" id="hamburger-menu">
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
          </div>
        </nav>
        <div class="nav-links" id="nav-links">
          <div><a href="fallback.html">Home</a></div>
          <div><a href="fallback.html">Projects</a></div>
          <div><a href="fallback.html">Account</a></div>
          <div><a href="fallback.html">Contact</a></div>
        </div>
      `;
    }
  
    addEventListeners() {
      console.log('Navbar component addEventListeners method called');
      const navLinks = this.shadowRoot.getElementById("nav-links");
      const hamburgerMenu = this.shadowRoot.getElementById("hamburger-menu");

      hamburgerMenu.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        console.log('Hamburger menu clicked');

      });


      ////////////////////// CURR NAVLINK HIGHLIGHTED FUNCTIONALITY TO BE ADDED LATER //////////////////////
      
      // function updateActiveLink() {
      //   const links = navLinks.querySelectorAll('a');
      //   const currentPage = window.location.hash;

      //   links.forEach(link => {
      //       link.classList.remove('current-page'); // remove the class from all links
      //       if (link.getAttribute('href') === currentPage) {
      //           link.classList.add('current-page'); // add class if the href matches the current page
      //       }
      //   });
      // }

      // updateActiveLink();
      // window.addEventListener('hashchange', updateActiveLink);

    }
  }
  
customElements.define('navbar-component', NavbarComponent);
  