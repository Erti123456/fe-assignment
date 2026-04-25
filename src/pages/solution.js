import { html } from "lit-html";
import { validateEmail } from "../api/emailApi.js";
import { loadData } from "../dataLoader.js";

const sellProduct1Image = "/sell-product-1.png";
const sellProduct2Image = "/sell-product-2.png";
const yellowStarImage = "/yellow-star.png";
const whiteStarImage = "/white-star.png";
const shoppingCartIcon = "/shopping-cart.png";
const plusIcon = "/plus.png";
const minusIcon = "/minus.png";
const handIcon = "/handIcon.png";
const scaleIcon = "/scale.png";
const heartIcon = "/heart-icon.png";
const mainBannerImage = "/main-banner.png";
const mainBannerShadowImage = "/shadow-banner.png";
const elektrickeNaradieImage = "/elektricke-naradie.png";
const shadowImage = "/shadow.png";
const shadowImage2 = "/shadow-2.png";
const zahradaLesImage = "/zahrada-lest.png";
const cistenieAUpratovanieImage = "/cistenie-a-upratovanie.png";
const rucneNaradieImage = "/rucne-naradie.png";
const prislusenstvoImage = "/prislusenstvo.png";
const pinkLineImage = "/pink-line.png";
const arrowIcon = "/arrow.png";
const arrowSelectIcon = "/arrow-select.png";
const crossIcon = "/cross.png";
const secretOfferImage = "/tanjna-ponuka.png";

let isModalOpen = false;
const rerenderSolutionPage = () => {
    window.dispatchEvent(new Event("solution-rerender"));
};

/**
 * Solution Page
 */

const closeModal = () => {
    isModalOpen = false;
    document.body.style.overflow = "";
    rerenderSolutionPage();
};

window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isModalOpen) {
        closeModal();
    }
});

const handleCtaClick = () => {
    isModalOpen = true;
    document.body.style.overflow = "hidden";
    rerenderSolutionPage();
};

const handleModalSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    if (!form.reportValidity()) {
        return;
    }

    const emailInput = form.querySelector("#email");

    if (!emailInput) {
        return;
    }

    emailInput.setCustomValidity("");

    const validationResult = await validateEmail(emailInput.value.trim());

    if (!validationResult.success) {
        emailInput.setCustomValidity(validationResult.message || "Email nie je validny.");
        form.reportValidity();
        emailInput.setCustomValidity("");
        return;
    }

    alert("Formular bol uspesne odoslany.");
    form.reset();
    closeModal();
};

const solutionModal = () => {
    return html`
        <div class="c-modal">
            <button
                class="c-modal__overlay"
                @click=${closeModal}
                aria-label="Zatvorit modal"
            ></button>
            <div class="c-modal__content" @click=${(event) => event.stopPropagation()}>
                <button class="c-modal__close" @click=${closeModal} aria-label="Zatvorit modal">
                    <img src="${crossIcon}" alt="" />
                </button>
                <form @submit=${handleModalSubmit}>
                    <div class="main-text">
                        <p class="left-text">Tajná ponuka produktov Dewalt len pre vás</p>
                        <p class="right-text">* povinné polia</p>
                    </div>
                    <div class="form-info">
                        <div class="email-div">
                            <label for="email">E-mail <span>*</span></label>
                            <input id="email" name="email" type="email" required />
                        </div>

                        <div class="name-phone-div">
                            <div class="name">
                                <label for="fullName">Meno a priezvisko <span>*</span></label>
                                <input id="fullName" name="fullName" type="text" required />
                            </div>

                            <div class="phone">
                                <label for="phone">Telefónne číslo (mobil) <span>*</span></label>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    placeholder="+421 _ _ _ _ _ _ _ _ _"
                                    required
                                    pattern="^\\+?(?:[0-9]\\s*){9,15}$"
                                    title="Zadajte 9 až 15 číslic, voliteľne s predvoľbou +."
                                />
                            </div>
                        </div>

                        <div class="source-div">
                            <label for="source"
                                >Odkiaľ ste sa o tejto ponuke dozvedeli? <span>*</span></label
                            >
                            <div class="source-select-upper-div">
                                <span class="source-select-label">Priamo z vášho webu</span>
                                <select id="source" name="source" required>
                                    <option value="Priamo z vášho webu">Priamo z vášho webu</option>
                                </select>
                                <img src="${arrowSelectIcon}" alt="" />
                            </div>
                        </div>

                        <div class="form-submit-footer">
                            <button type="submit" class="submit-button">
                                <span class="submit-button__text">Získať tajnú ponuku</span>
                                <div class="arrow-div">
                                    <img src="${arrowIcon}" alt="" class="submit-button__icon" />
                                </div>
                            </button>
                            <p class="text">
                                Odoslaním formuláru súhlasíte so
                                <span>spracovaním osobných údajov</span>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    `;
};

const handleBannerClick = () => {
    document.querySelector(".l-solution__categories")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
    });
};

const renderDescriptionWithStrong = (description, strongText) => {
    const safeDescription = String(description ?? "");

    const strongTextStart = safeDescription.indexOf(strongText);

    if (strongTextStart === -1) {
        return safeDescription;
    }

    const before = safeDescription.slice(0, strongTextStart);
    const after = safeDescription.slice(strongTextStart + strongText.length);

    return html`${before}<strong>${strongText}</strong>${after}`;
};

// Solution main banner
const solutionBanner = (banner) => html`
    <div class="c-solution-banner">
        <div
            class="c-solution-banner__image"
            style="background-image: url('${mainBannerImage}')"
        ></div>
        <img class="c-solution-banner__shadow" src="${mainBannerShadowImage}" alt="" />
        <div class="c-solution-banner__overlay"></div>
        <div class="c-solution-banner__content">
            <h1 class="c-solution-banner__content__title">${banner.title}</h1>
            <div class="c-solution-banner__content__description">
                ${renderDescriptionWithStrong(
                    banner.description,
                    "vŕtačky R-driller so zľavami až do 40 %. Spoľahlivý výkon, precízne spracovanie a dlhá životnosť"
                )}
            </div>
            <button class="c-solution-banner__content__button" @click=${() => handleBannerClick()}>
                <span class="sb-text">${banner.ctaText}</span>
                <svg
                    class="sb-icon"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M4.16663 10H15.8333M15.8333 10L9.99996 4.16669M15.8333 10L9.99996 15.8334"
                        stroke="currentColor"
                        stroke-width="1.67"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </button>
        </div>
    </div>
`;

// Solution CTA section
const solutionCta = (ctaBanner) => {
    return html`
        <div class="c-solution-cta">
            <div
                class="c-solution-cta__image"
                style="background-image: url('${secretOfferImage}')"
            ></div>

            <div class="c-solution-cta__overlay"></div>

            <div class="c-solution-cta__content">
                <h2 class="c-solution-cta__content__title">${ctaBanner.title}</h2>

                <div class="c-solution-cta__content__description">
                    ${renderDescriptionWithStrong(
                        ctaBanner.description,
                        "výkonných a spoľahlivých vŕtačiek"
                    )}
                </div>

                <button class="c-solution-cta__content__button" @click=${() => handleCtaClick()}>
                    <span class="sc-text">${ctaBanner.ctaText}</span>

                    <svg
                        class="sc-icon"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M4.16663 10H15.8333M15.8333 10L9.99996 4.16669M15.8333 10L9.99996 15.8334"
                            stroke="currentColor"
                            stroke-width="1.67"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </button>
            </div>
        </div>
    `;
};
const solutionProducts = (product) => {
    const getQuantityInput = (element) => {
        return element.closest(".c-solution-product__buy-zone__purchase")?.querySelector("input");
    };

    const clampQuantity = (value) => {
        const parsedValue = Number.parseInt(value, 10);

        if (Number.isNaN(parsedValue)) {
            return 1;
        }

        return Math.min(10, Math.max(1, parsedValue));
    };

    const handleDecreaseQuantity = (event) => {
        const input = getQuantityInput(event.currentTarget);

        if (!input) {
            return;
        }

        const nextValue = Math.max(1, clampQuantity(input.value) - 1);
        input.value = String(nextValue);
    };

    const handleIncreaseQuantity = (event) => {
        const input = getQuantityInput(event.currentTarget);

        if (!input) {
            return;
        }

        const currentValue = clampQuantity(input.value);

        if (currentValue >= 10) {
            alert("Nie je možné pridať viac ako 10 kusov.");
            return;
        }

        input.value = String(currentValue + 1);
    };

    const handleAddToCart = (event, productName) => {
        const input = getQuantityInput(event.currentTarget);

        if (!input) {
            return;
        }

        const quantity = clampQuantity(input.value);
        input.value = String(quantity);

        alert(`Do košíka bolo pridaných ${quantity} ks produktu ${productName}.`);
    };

    const handleQuantityInput = (event) => {
        const input = event.currentTarget;
        const digitsOnlyValue = input.value.replace(/\D/g, "");

        if (digitsOnlyValue === "") {
            input.value = "";
            return;
        }

        input.value = String(clampQuantity(digitsOnlyValue));
    };

    const handleQuantityBlur = (event) => {
        const input = event.currentTarget;
        input.value = String(clampQuantity(input.value));
    };

    const labels = (product.badges ?? []).map((badge) => {
        if (badge.type === "discount") {
            return html`<label class="c-solution-product__position__labels__discount"
                >${badge.label}</label
            >`;
        } else if (badge.type === "new") {
            return html`<label class="c-solution-product__position__labels__new"
                >${badge.label}</label
            >`;
        }

        return html``;
    });

    const icons = () => {
        if (product.id === "1") {
            return html`
                <div class="two-icons">
                    <div class="scale-div">
                        <span><img class="icon" src="${scaleIcon}" alt="Porovnať produkt" /></span>
                    </div>
                    <div class="heart-div">
                        <span>
                            <img class="icon" src="${heartIcon}" alt="Pridať medzi obľúbené" />
                        </span>
                    </div>
                </div>
            `;
        }
        if (product.id === "2") {
            return html``;
        }

        return html``;
    };

    const handOverlay = () => {
        if (product.id === "1") {
            return html`
                <div class="hand-div">
                    <img class="icon" src="${handIcon}" alt="" />
                </div>
            `;
        }

        return html``;
    };

    const image = () => {
        const imageSrc =
            product.id === "1"
                ? sellProduct1Image
                : product.id === "2"
                  ? sellProduct2Image
                  : product.imageUrl;

        if (!imageSrc) {
            return html``;
        }

        return html`
            <img src="${imageSrc}" alt="${product.name}" class="c-solution-product__image" />
        `;
    };

    const generatedStars = Array.from({ length: 5 }, (_, index) => {
        const rating = Number(product.rating) || 0;
        const starImage = index < rating ? yellowStarImage : whiteStarImage;

        return html`
            <img
                src="${starImage}"
                alt=""
                class="c-solution-product__buy-zone__details__identification__stars__star"
            />
        `;
    });

    return html`<div class="c-solution-product">
        ${icons()} ${handOverlay()}
        <div class="c-solution-product__position">
            <div class="c-solution-product__position__labels">${labels}</div>
        </div>
        ${image()}
        <div class="c-solution-product__buy-zone">
            <div class="c-solution-product__buy-zone__details">
                <div class="c-solution-product__buy-zone__details__identification ">
                    <div
                        class="c-solution-product__buy-zone__details__identification__stars"
                        aria-label="Hodnotenie ${product.rating} z 5"
                    >
                        ${generatedStars}
                        <p class="c-solution-product__buy-zone__details__identification__number">
                            (${product.reviewCount})
                        </p>
                    </div>
                    <h3>${product.name}</h3>
                    <p class="c-solution-product__buy-zone__details__identification__sku">
                        ${product.sku}
                    </p>
                </div>
                <div class="c-solution-product__buy-zone__details__prices">
                    <div class="c-solution-product__buy-zone__details__prices__money">
                        <p
                            class="c-solution-product__buy-zone__details__prices__money__crossed-text"
                        >
                            ${product.originalPrice} ${product.currency}
                        </p>
                        <h4>${product.salePrice} ${product.currency}</h4>
                        <p
                            class="c-solution-product__buy-zone__details__prices__money__without-dph"
                        >
                            ${product.priceWithoutVAT} ${product.currency} <span>bez DPH</span>
                        </p>
                    </div>
                    <div class="c-solution-product__buy-zone__details__prices__stock">
                        <p>${product.stock}</p>
                    </div>
                </div>
            </div>
            <div class="c-solution-product__buy-zone__purchase">
                <div class="add-remove-input">
                    <span @click=${handleDecreaseQuantity}
                        ><img class="minus" src="${minusIcon}" alt="Znížiť množstvo"
                    /></span>
                    <input
                        value="1"
                        inputmode="numeric"
                        min="1"
                        max="10"
                        aria-label="Počet kusov produktu ${product.name}"
                        @input=${handleQuantityInput}
                        @blur=${handleQuantityBlur}
                    />
                    <span @click=${handleIncreaseQuantity}
                        ><img class="plus" src="${plusIcon}" alt="Zvýšiť množstvo"
                    /></span>
                </div>
                <button @click=${(event) => handleAddToCart(event, product.name)}>
                    <img src="${shoppingCartIcon}" alt="" class="sb-icon" />
                    <p>Do košíka</p>
                </button>
            </div>
        </div>
    </div>`;
};

const solutionCategories = (categories) => {
    const safeCategories = Array.isArray(categories) ? categories : [];

    const generateContent = (category) => {
        if (!category) {
            return html``;
        }

        if (
            category.id === "elektricke-naradie" ||
            category.id === "rucne-naradie" ||
            category.id === "prislusenstvo"
        ) {
            return html`
                <div class="title">
                    <p class="text">${category.name}</p>
                    <div class="circle"><span>${category.productCount}</span></div>
                </div>
                <div class="desc">
                    <div class="pink-lines">
                        ${(category.subcategories ?? []).map(() => {
                            return html`<img class="pink-line" src="${pinkLineImage}" alt="" />`;
                        })}
                    </div>
                    <div class="text-box">
                        ${(category.subcategories ?? []).map((subCategory) => {
                            return html`<p class="text">${subCategory.name}</p>`;
                        })}
                    </div>
                </div>
                <div class="all-categories">
                    <p class="cta">${category.ctaText}</p>
                    <div><img src="${arrowIcon}" alt="" /></div>
                </div>
            `;
        }
        if (category.id === "zahrada-a-les" || category.id === "cistenie-a-upratovanie") {
            return html`
                <div class="title">
                    <p class="text">${category.name}</p>
                    <div class="circle"><span>${category.productCount}</span></div>
                </div>
                <div class="all-desc">
                    <div class="desc">
                        <div class="pink-lines">
                            ${(category.subcategories ?? []).slice(0, 3).map(() => {
                                return html`<img
                                    class="pink-line"
                                    src="${pinkLineImage}"
                                    alt=""
                                />`;
                            })}
                        </div>
                        <div class="text-box">
                            ${(category.subcategories ?? []).slice(0, 3).map((subCategory) => {
                                return html`<p class="text">${subCategory.name}</p>`;
                            })}
                        </div>
                    </div>
                    <div class="desc">
                        <div class="pink-lines">
                            ${(category.subcategories ?? []).slice(3, 6).map(() => {
                                return html`<img
                                    class="pink-line"
                                    src="${pinkLineImage}"
                                    alt=""
                                />`;
                            })}
                        </div>
                        <div class="text-box">
                            ${(category.subcategories ?? []).slice(3, 6).map((subCategory) => {
                                return html`<p class="text">${subCategory.name}</p>`;
                            })}
                        </div>
                    </div>
                </div>
                <div class="all-categories">
                    <p class="cta">${category.ctaText}</p>
                    <div><img src="${arrowIcon}" alt="" /></div>
                </div>
            `;
        }
        return html``;
    };

    return html`
        <div class="l-solution__categories">
            <h2>Top kategórie produktov</h2>
            <div class="container">
                <div class="left-section">
                    <div class="left-section__upper">
                        <div class="left-section__upper__left small-box">
                            <img src="${elektrickeNaradieImage}" alt="Elektrické náradie" />
                            <img class="shadow" src="${shadowImage}" alt="" />
                            <div class="content">${generateContent(safeCategories[0])}</div>
                        </div>
                        <div class="left-section__upper__right big-box">
                            <img src="${zahradaLesImage}" alt="Záhrada a les" />
                            <img class="shadow" src="${shadowImage}" alt="" />
                            <div class="content">${generateContent(safeCategories[1])}</div>
                        </div>
                    </div>
                    <div class="left-section__lower">
                        <div class="left-section__lower__left big-box">
                            <img src="${cistenieAUpratovanieImage}" alt="Čistenie a upratovanie" />
                            <img class="shadow" src="${shadowImage}" alt="" />
                            <div class="content">${generateContent(safeCategories[2])}</div>
                        </div>
                        <div class="left-section__lower__right small-box">
                            <img src="${rucneNaradieImage}" alt="Ručné náradie" />
                            <img class="shadow" src="${shadowImage}" alt="" />
                            <div class="content">${generateContent(safeCategories[3])}</div>
                        </div>
                    </div>
                </div>
                <div class="right-section">
                    <div class="right-section__image-wrap">
                        <img src="${prislusenstvoImage}" alt="Príslušenstvo" />
                        <img class="shadow" src="${shadowImage2}" alt="" />
                    </div>
                    <div class="content">${generateContent(safeCategories[4])}</div>
                </div>
            </div>
        </div>
    `;
};

// Main page template
export const renderSolutionPage = (data) => {
    if (!data) {
        return html`<div class="l-solution">Loading...</div>`;
    }

    const products = Array.isArray(data.products) ? data.products : [];
    const categories = Array.isArray(data.categories) ? data.categories : [];

    return html`
        <div class="l-solution">
            <div class="l-solution__banner">
                <div class="l-container">${data.banner ? solutionBanner(data.banner) : html``}</div>
            </div>
            <div class="l-solution__content-and-categories-container">
                <div class="l-solution__content">
                    <div class="c-solution-content">
                        <div class="c-solution-content__cta">
                            ${data.ctaBanner ? solutionCta(data.ctaBanner) : html``}
                        </div>
                        <div class="c-solution-content__products">
                            ${products.map((product) => {
                                return solutionProducts(product);
                            })}
                        </div>
                    </div>
                </div>
                ${categories.length ? solutionCategories(categories) : html``}
            </div>
            ${isModalOpen ? solutionModal() : html``}
        </div>
    `;
};

/**
 * Load data and render the solution page
 */
export const loadAndRenderSolutionPage = async () => {
    try {
        const data = await loadData();

        return renderSolutionPage(data);
    } catch (error) {
        return html`<div class="l-solution">Error loading data: ${error.message}</div>`;
    }
};
