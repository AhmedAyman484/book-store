<template>
    <footer class="footer position-relative overflow-hidden">

        <div class="container">

            <div class="row g-5 pb-4">

                <div class="col-12 col-md-6 col-lg-5">

                    <RouterLink to="/" class="footer-brand d-inline-flex align-items-center justify-content-center justify-content-md-start gap-2 text-decoration-none fw-bold">
                        <div class="footer-icon d-flex align-items-center justify-content-center">
                            <img src="../assets/imgs/footerlogo.png" alt="" />
                        </div>

                        <span>Book Store</span>
                    </RouterLink>

                    <p class="footer-description mt-3 mb-3 text-center text-md-start mx-auto mx-md-0 text-center text-md-start mx-auto mx-md-0">
                        Discover great books, explore amazing authors,
                        and find your next favorite story.
                    </p>

                    <p class="footer-credit mb-0 text-center text-md-start text-center text-md-start">
                        Designed & Developed by
                        <strong>Ahmed Ayman</strong>
                    </p>

                </div>

                <div class="col-12 col-md-3 col-lg-3">

                    <h3 class="footer-heading mb-3 mt-2 mt-md-0 fw-semibold fs-6">
                        Quick Links
                    </h3>

                    <div class="d-flex flex-column gap-2">

                        <RouterLink to="/" class="footer-link text-decoration-none">
                            Home
                        </RouterLink>

                        <RouterLink to="/books" class="footer-link text-decoration-none">
                            Books
                        </RouterLink>

                        <RouterLink to="/authors" class="footer-link text-decoration-none">
                            Authors
                        </RouterLink>

                        <RouterLink to="/about" class="footer-link text-decoration-none">
                            About
                        </RouterLink>

                    </div>

                </div>

                <div class="col-12 col-md-3 col-lg-4">

                    <h3 class="footer-heading mb-3 mt-2 mt-md-0 fw-semibold fs-6">
                        Follow Me
                    </h3>

                    <div class="d-flex gap-2">

                        <a href="#"
                            class="social-link d-flex align-items-center justify-content-center text-decoration-none"
                            aria-label="LinkedIn">
                            <i class="bi bi-linkedin"></i>
                        </a>

                        <a href="#"
                            class="social-link d-flex align-items-center justify-content-center text-decoration-none"
                            aria-label="Facebook">
                            <i class="bi bi-facebook"></i>
                        </a>

                        <a href="#"
                            class="social-link d-flex align-items-center justify-content-center text-decoration-none"
                            aria-label="Instagram">
                            <i class="bi bi-instagram"></i>
                        </a>

                    </div>

                </div>

            </div>

            <div class="footer-bottom border-top pt-3 mt-2 d-flex justify-content-center justify-content-md-between align-items-center flex-wrap gap-3 text-center text-md-start">

                <p class="mb-0">
                    © 2026 Book Store. All rights reserved.
                </p>

                <div class="d-flex flex-wrap justify-content-center justify-content-md-start gap-3">

                    <a href="#" class="footer-policy-link text-decoration-none">
                        Terms of Use
                    </a>

                    <a href="#" class="footer-policy-link text-decoration-none">
                        Privacy Policy
                    </a>

                    <a href="#" class="footer-policy-link text-decoration-none">
                        Cookie Policy
                    </a>

                    <a href="#" class="footer-policy-link text-decoration-none">
                        Contact Us
                    </a>

                </div>

            </div>

        </div>

        <img src="../assets/imgs/footerbg.png" alt="" class="footer-leaf position-absolute" />

    </footer>
</template>