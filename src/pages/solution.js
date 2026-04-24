import { html } from "lit-html";
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
const elektrickeNaradieImage = "/elektricke-naradie.png";
const shadowImage = "/shadow.png";
const shadowImage2 = "/shadow-2.png";
const zahradaLesImage = "/zahrada-lest.png";
const cistenieAUpratovanieImage = "/cistenie-a-upratovanie.png";
const rucneNaradieImage = "/rucne-naradie.png";
const prislusenstvoImage = "/prislusenstvo.png";

/**
 * Solution Page
 */

// CTA button click handler
const handleCtaClick = () => {
    console.log("CTA button clicked");
    // TODO: Implement email form/modal
};

// Banner button click handler
const handleBannerClick = () => {
    console.log("Banner button clicked");
    // TODO: Navigate to products or filter
};

// Solution main banner
const solutionBanner = (banner) => html`
    <div class="c-solution-banner">
        <div class="c-solution-banner__image"></div>
        <div class="c-solution-banner__overlay"></div>
        <div class="c-solution-banner__content">
            <h1 class="c-solution-banner__content__title">${banner.title}</h1>
            <div class="c-solution-banner__content__description">${banner.description}</div>
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
const solutionCta = (ctaBanner) => html`
    <div class="c-solution-cta">
        <div class="c-solution-cta__image"></div>

        <div class="c-solution-cta__overlay"></div>

        <div class="c-solution-cta__content">
            <h2 class="c-solution-cta__content__title">${ctaBanner.title}</h2>

            <div class="c-solution-cta__content__description">${ctaBanner.description}</div>

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

    const labels = product.badges.map((badge) => {
        if (badge.type === "discount") {
            return html`<label class="c-solution-product__position__labels__discount"
                >${badge.label}</label
            >`;
        } else if (badge.type === "new") {
            return html`<label class="c-solution-product__position__labels__new"
                >${badge.label}</label
            >`;
        }
    });

    const icons = () => {
        if (product.id === "1") {
            return html`
                <div class="two-icons">
                    <div class="scale-div">
                        <span><img class="icon" src="${scaleIcon}" alt="scale-icon" /></span>
                    </div>
                    <div class="heart-div">
                        <span> <img class="icon" src="${heartIcon}" alt="heart-icon" /> </span>
                    </div>
                </div>
            `;
        }
        if (product.id === "2") {
            return html``;
        }
    };

    const handOverlay = () => {
        if (product.id === "1") {
            return html`
                <div class="hand-div">
                    <img class="icon" src="${handIcon}" alt="hand-icon" />
                </div>
            `;
        }

        return html``;
    };

    const image = () => {
        if (product.id === "1") {
            return html`
                <img
                    src="${sellProduct1Image}"
                    alt="${product.name}"
                    class="c-solution-product__image"
                />
            `;
        }
        if (product.id === "2") {
            return html`
                <img
                    src="${sellProduct2Image}"
                    alt="${product.name}"
                    class="c-solution-product__image"
                />
            `;
        }
    };

    const generatedStars = Array.from({ length: 5 }, (_, index) => {
        const starImage = index < product.rating ? yellowStarImage : whiteStarImage;

        return html`
            <img
                src="${starImage}"
                alt="star"
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
                    <div class="c-solution-product__buy-zone__details__identification__stars">
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
                        ><img class="minus" src="${minusIcon}" alt="minus"
                    /></span>
                    <input
                        value="1"
                        inputmode="numeric"
                        min="1"
                        max="10"
                        @input=${handleQuantityInput}
                        @blur=${handleQuantityBlur}
                    />
                    <span @click=${handleIncreaseQuantity}
                        ><img class="plus" src="${plusIcon}" alt="plus"
                    /></span>
                </div>
                <button @click=${(event) => handleAddToCart(event, product.name)}>
                    <img src="${shoppingCartIcon}" class="sb-icon" />
                    <p>Do košíka</p>
                </button>
            </div>
        </div>
    </div>`;
};

// Main page template
export const renderSolutionPage = (data) => {
    if (!data) {
        return html`<div class="l-solution">Loading...</div>`;
    }

    console.log("data.banner:\n", data.banner);
    console.log("data.ctaBanner:\n", data.ctaBanner);
    console.log("data.products:\n", data.products);
    console.log("data.categories:\n", data.categories);

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
                            ${data.products
                                ? data.products.map((product) => {
                                      return solutionProducts(product);
                                  })
                                : html``}
                        </div>
                    </div>
                </div>

                <div class="l-solution__categories">
                    <h2>Top kategórie produktov</h2>
                    <div class="container">
                        <div class="left-section">
                            <div class="left-section__upper">
                                <div class="left-section__upper__left">
                                    <img src="${elektrickeNaradieImage}" />
                                    <img class="shadow" src="${shadowImage}" alt="" />
                                    <div class="content"></div>
                                </div>
                                <div class="left-section__upper__right">
                                    <img src="${zahradaLesImage}" />
                                    <img class="shadow" src="${shadowImage}" alt="" />
                                    <div class="content"></div>
                                </div>
                            </div>
                            <div class="left-section__lower">
                                <div class="left-section__lower__left">
                                    <img src="${cistenieAUpratovanieImage}" />
                                    <img class="shadow" src="${shadowImage}" alt="" />
                                    <div class="content"></div>
                                </div>
                                <div class="left-section__lower__right">
                                    <img src="${rucneNaradieImage}" />
                                    <img class="shadow" src="${shadowImage}" alt="" />
                                    <div class="content"></div>
                                </div>
                            </div>
                        </div>
                        <div class="right-section">
                            <div class="right-section__image-wrap">
                                <img src="${prislusenstvoImage}" />
                                <img class="shadow" src="${shadowImage2}" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
