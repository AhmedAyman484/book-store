<template>
    <main>
        <section class="about-hero">
            <div class="container py-5">
                <div class="row">
                    <div class="col-lg-8">
                        <p class="about-label mb-3 fw-medium">ABOUT OUR BOOK STORE</p>

                        <h1 class="about-title mb-3 fw-bold">
                            More Than Books,
                            <br />
                            <span>A Community of Readers</span>
                        </h1>

                        <p class="about-text mb-3">
                            At Book Store, we believe that every book has the power to
                            inspire, educate, and change lives. Our mission is to bring
                            readers and great stories together, making it easy to explore
                            books, discover amazing authors, and find your next favorite read.
                        </p>

                        <div class="about-quote ps-3">
                            <p class="mb-1">
                                “A book is a dream that you hold in your hands.”
                            </p>

                            <span>— Neil Gaiman</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="about-stats container py-3 mt-4 mb-2">
            <div class="row align-items-center text-center g-0">
                <div class="col-12 col-md-6 col-lg-3 about-stat">
                    <i class="bi bi-book"></i>

                    <div>
                        <h3>40+</h3>
                        <p>Books in Collection</p>
                    </div>
                </div>

                <div class="col-12 col-md-6 col-lg-3 about-stat">
                    <i class="bi bi-people"></i>

                    <div>
                        <h3>10+</h3>
                        <p>Talented Authors</p>
                    </div>
                </div>

                <div class="col-12 col-md-6 col-lg-3 about-stat">
                    <i class="bi bi-layers"></i>

                    <div>
                        <h3>15+</h3>
                        <p>Categories</p>
                    </div>
                </div>

                <div class="col-12 col-md-6 col-lg-3 about-stat">
                    <i class="bi bi-heart"></i>

                    <div>
                        <h3>Thousands</h3>
                        <p>Happy Readers</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="container py-3">
            <div class="row g-4 align-items-center">
                <div class="col-12 col-lg-4">
                    <div class="about-values-image position-relative">
                        <img src="../assets/imgs/about1.png" alt="Reading books" class="img-fluid" />

                        <div class="reading-badge position-absolute">
                            <i class="bi bi-book"></i>

                            <span>
                                Read<br />
                                Explore<br />
                                Grow
                            </span>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-lg-8">
                    <p class="about-label mb-2 fw-medium">OUR VALUES</p>

                    <h2 class="about-section-title mb-4 fw-bold">Why We Do What We Do</h2>

                    <div class="row g-4">
                        <div class="col-12 col-md-4">
                            <div class="value-icon text-center rounded-circle">
                                <i class="bi bi-book"></i>
                            </div>

                            <h3>For Readers</h3>

                            <p>
                                We create a space where everyone can easily find and explore
                                books they’ll love.
                            </p>
                        </div>

                        <div class="col-12 col-md-4">
                            <div class="value-icon text-center rounded-circle">
                                <i class="bi bi-person"></i>
                            </div>

                            <h3>For Authors</h3>

                            <p>
                                We celebrate the brilliant minds behind the stories and help
                                them reach more readers.
                            </p>
                        </div>

                        <div class="col-12 col-md-4">
                            <div class="value-icon text-center rounded-circle">
                                <i class="bi bi-heart"></i>
                            </div>

                            <h3>For a Better Tomorrow</h3>

                            <p>
                                We believe in the power of books to build a more curious,
                                empathetic, and open-minded world.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="container py-3">
            <div class="about-faq py-3">
                <div class="row g-4 align-items-start">
                    <div class="col-12 col-lg-5">
                        <p class="about-label mb-2 fw-medium">FREQUENTLY ASKED QUESTIONS</p>
                        <h2 class="about-section-title mb-2 fw-bold">Questions, Answered</h2>
                        <p class="text-secondary mb-0">
                            Find quick answers about our collection, authors, and the Book Store experience.
                        </p>
                    </div>

                    <div class="col-12 col-lg-7">
                        <div class="accordion" id="faqAccordion">
                            <div class="accordion-item">
                                <h3 class="accordion-header">
                                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faqOne" aria-expanded="true" aria-controls="faqOne">
                                        How can I find a book?
                                    </button>
                                </h3>
                                <div id="faqOne" class="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                                    <div class="accordion-body">
                                        Use the Books page to search by title, filter the collection, and sort the results by title or publication year.
                                    </div>
                                </div>
                            </div>

                            <div class="accordion-item">
                                <h3 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqTwo" aria-expanded="false" aria-controls="faqTwo">
                                        Can I explore an author's books?
                                    </button>
                                </h3>
                                <div id="faqTwo" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                    <div class="accordion-body">
                                        Yes. Open an author profile to read their biography and browse the books connected to that author.
                                    </div>
                                </div>
                            </div>

                            <div class="accordion-item">
                                <h3 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqThree" aria-expanded="false" aria-controls="faqThree">
                                        How does the AI assistant work?
                                    </button>
                                </h3>
                                <div id="faqThree" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                    <div class="accordion-body">
                                        On book and author detail pages, the AI assistant can answer questions using the information for the item you are viewing.
                                    </div>
                                </div>
                            </div>

                            <div class="accordion-item">
                                <h3 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqFour" aria-expanded="false" aria-controls="faqFour">
                                        Can admins add or edit content?
                                    </button>
                                </h3>
                                <div id="faqFour" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                    <div class="accordion-body">
                                        Admin users can create, edit, and delete books and authors from the protected dashboard.
                                    </div>
                                </div>
                            </div>

                            <div class="accordion-item">
                                <h3 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqFive" aria-expanded="false" aria-controls="faqFive">
                                        What happens if there is a loading or API error?
                                    </button>
                                </h3>
                                <div id="faqFive" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                    <div class="accordion-body">
                                        The application shows a loading state while data is being requested and an error state with a retry action when a request fails.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="container py-3">

            <div class="about-cta position-relative overflow-hidden">

                <img src="../assets/imgs/about3.png" alt="" class="about-cta-leaf about-cta-leaf-left position-absolute h-auto">

                <img src="../assets/imgs/about2.png" alt="" class="about-cta-leaf about-cta-leaf-right position-absolute h-auto">

                <div class="row align-items-center g-3 position-relative pe-lg-4">

                    <div class="join col-12 col-lg-8 ">

                        <h2>
                            Join Our Reading Journey
                        </h2>

                        <p class=" mb-0">
                            Whether you're here to find your next favorite book,
                            learn about inspiring authors, or simply explore,
                            we're so glad to have you with us.
                        </p>

                    </div>

                    <div class="col-12 col-lg-4 text-lg-end pe-lg-5">

                        <RouterLink to="/books" class="btn about-cta-btn text-decoration-none">
                            Explore Books
                            <i class="bi bi-arrow-right ms-2"></i>
                        </RouterLink>

                    </div>

                </div>

            </div>

        </section>
    </main>
</template>
