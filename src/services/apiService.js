class APIError extends Error {
  constructor(message, status = 0, data = {}) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.data = data;
  }
  isNetworkError() {
    return this.status === 0;
  }
  isClientError() {
    return this.status >= 400 && this.status < 500;
  }
  isServerError() {
    return this.status >= 500;
  }
}

export class APIService {
  constructor(baseURL = 'http://localhost:3000/api') {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = { headers: { ...this.defaultHeaders, ...options.headers }, ...options };
    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new APIError(errorData.error || `HTTP ${response.status}: ${response.statusText}`,
          response.status, errorData);
      }
      const data = await response.json();
      if (data && data.success === false) {
        throw new APIError(data.error || 'Erreur inconnue', 400, data);
      }
      return data;
    } catch (error) {
      if (error instanceof APIError) throw error;
      throw new APIError('Erreur de connexion au serveur', 0, { originalError: error.message });
    }
  }

  async get(endpoint, params = {}) {
    const qs = new URLSearchParams(params).toString();
    const url = qs ? `${endpoint}?${qs}` : endpoint;
    return this.request(url, { method: 'GET' });
  }
  async post(endpoint, data = {}) {
    return this.request(endpoint, { method: 'POST', body: JSON.stringify(data) });
  }
  async put(endpoint, data = {}) {
    return this.request(endpoint, { method: 'PUT', body: JSON.stringify(data) });
  }
  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }

  async getProducts(filters = {}) {
    const response = await this.get('/products', filters);
    return response.data || [];
  }
  async getProductsByCategory(category) {
    const response = await this.get('/products', { category });
    return response.data || [];
  }
  async getProduct(id) {
    const response = await this.get(`/products/${id}`);
    return response.data;
  }
  async getCategories() {
    const response = await this.get('/categories');
    return response.data || [];
  }
  async createQuote(quoteData) {
    return this.post('/quotes', quoteData);
  }
  async getQuotes() {
    const response = await this.get('/quotes');
    return response.data || [];
  }
  async updateQuoteStatus(quoteId, status) {
    return this.put(`/quotes/${quoteId}/status`, { status });
  }
  async sendContact(contactData) {
    return this.post('/contact', contactData);
  }
  async sendWhatsApp(whatsappData) {
    return this.post('/whatsapp/send', whatsappData);
  }
  async healthCheck() {
    try {
      const response = await this.get('/health');
      return response.success === true;
    } catch (e) {
      return false;
    }
  }
}

export const apiService = new APIService();
export { APIError };

