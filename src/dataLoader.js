import { CONFIG } from "./config.js";

const CACHE_KEY = "fe_assignment_data_cache";
const CACHE_TIMESTAMP_KEY = "fe_assignment_data_timestamp";

/**
 * Check if cached data is still valid
 */
const isCacheValid = () => {
    if (!CONFIG.DEV_MODE) {
        return false;
    }

    const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
    if (!timestamp) {
        return false;
    }

    const cacheAge = Date.now() - parseInt(timestamp, 10);
    return cacheAge < CONFIG.DEV_CACHE_DURATION;
};

/**
 * Get cached data from localStorage
 */
const getCachedData = () => {
    try {
        const cached = localStorage.getItem(CACHE_KEY);
        return cached ? JSON.parse(cached) : null;
    } catch {
        return null;
    }
};

/**
 * Save data to localStorage cache
 */
const setCachedData = (data) => {
    if (!CONFIG.DEV_MODE) {
        return;
    }

    try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(data));
        localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
    } catch {
        return;
    }
};

/**
 * Load data from API
 *
 * @returns {Promise<Object>} Data object with banner, ctaBanner, products, categories
 */
export const loadData = async () => {
    // Check cache first in DEV mode
    if (CONFIG.DEV_MODE && isCacheValid()) {
        const cachedData = getCachedData();
        if (cachedData) {
            return cachedData;
        }
    }

    const mode = CONFIG._TEST_MODE || "static";
    const modeParam = mode === "static" ? "" : `?mode=${mode}`;

    const [banner, ctaBanner, products, categories] = await Promise.all([
        fetch(`${CONFIG.API_BASE_URL}/banner${modeParam}`).then((r) => r.json()),
        fetch(`${CONFIG.API_BASE_URL}/cta-banner${modeParam}`).then((r) => r.json()),
        fetch(`${CONFIG.API_BASE_URL}/products${modeParam}`).then((r) => r.json()),
        fetch(`${CONFIG.API_BASE_URL}/categories${modeParam}`).then((r) => r.json()),
    ]);

    const data = {
        banner: banner.data,
        ctaBanner: ctaBanner.data,
        products: products.data,
        categories: categories.data,
    };

    // Cache data in DEV mode
    setCachedData(data);

    return data;
};

/**
 * Clear cached data (useful for development)
 */
export const clearCache = () => {
    localStorage.removeItem(CACHE_KEY);
    localStorage.removeItem(CACHE_TIMESTAMP_KEY);
};

/**
 * Log data source info to console
 */
export const logDataMode = () => {
    if (CONFIG.DEV_MODE) {
        window.clearCache = clearCache;
    }
};
