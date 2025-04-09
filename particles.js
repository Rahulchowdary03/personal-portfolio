{/* <script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script> */}

        // Initialize particles.js
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#4cc9f0'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    },
                    polygon: {
                        nb_sides: 5
                    }
                },
                opacity: {
                    value: 0.3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 10,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#4cc9f0',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'window',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'repulse'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    }
                },
                modes: {
                    repulse: {
                        distance: 100,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });

        // Text animation
        const allElements = document.querySelectorAll('.animated-text');

        if (allElements.length > 0) {
            allElements.forEach((element) => {
                const txtElement = element,
                    wordsList = txtElement.getAttribute('data-words'),
                    words = wordsList.split(', ');

                let wordsCount = 0;

                entry();

                function entry() {
                    if (wordsCount < words.length) {
                        let word = words[wordsCount],
                            txtArr = word.split(''),
                            count = 0;

                        txtElement.textContent = '';

                        txtArr.forEach((letter) => {
                            let _letter = letter === ' ' ? '&nbsp;' : letter;
                            txtElement.innerHTML += `<span>${_letter}</span>`;
                        });

                        let spans = txtElement.childNodes;

                        const letterInterval = setInterval(activeLetter, 70);

                        function activeLetter() {
                            spans[count].classList.add('active');
                            count++;

                            if (count === spans.length) {
                                clearInterval(letterInterval);
                                setTimeout(() => {
                                    eraseText();
                                }, 2000);
                            }
                        }

                        function eraseText() {
                            let removeInterval = setInterval(removeLetter, 40);
                            count--;

                            function removeLetter() {
                                spans[count].classList.remove('active');
                                count--;

                                if (count === -1) {
                                    clearInterval(removeInterval);
                                    wordsCount++;
                                    entry();
                                }
                            }
                        }
                    } else {
                        wordsCount = 0;
                        entry();
                    }
                }
            });
        }

        // Education details toggle
        function toggleDetails(id) {
            const details = document.getElementById(id);
            const btn = details.previousElementSibling;
            
            if (details.style.display === "block") {
                details.style.display = "none";
                btn.innerHTML = btn.innerHTML.replace('▲', '▼');
            } else {
                // Close any open details first
                document.querySelectorAll('.education-details').forEach(detail => {
                    if (detail.id !== id && detail.style.display === "block") {
                        detail.style.display = "none";
                        const otherBtn = detail.previousElementSibling;
                        otherBtn.innerHTML = otherBtn.innerHTML.replace('▲', '▼');
                    }
                });
                
                details.style.display = "block";
                btn.innerHTML = btn.innerHTML.replace('▼', '▲');
            }
        }
    