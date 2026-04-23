import { html } from "lit-html";
import { loadData } from "../dataLoader.js";

const sellProduct1Image = "/sell-product-1.png";
const yellowStarImage = "/yellow-star.png";
const whiteStarImage = "/white-star.png";

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
    console.log(product);

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
        <div class="c-solution-product__position">
            <div class="c-solution-product__position__labels">${labels}</div>
        </div>
        <img src="${sellProduct1Image}" alt="${product.name}" class="c-solution-product__image" />
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

                <div></div>
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

            <div class="l-solution__content">
                <div class="l-container is-shorter">
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
            </div>

            <div class="l-solution__categories">
                <div class="l-container">
                    <div class="c-solution-categories"></div>
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
