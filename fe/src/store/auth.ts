class AuthService {
  private authHeader: string | null = null;

  constructor() {

    const savedAuthHeader = localStorage.getItem('authHeader');
    if (savedAuthHeader) {
      this.authHeader = savedAuthHeader;
    }
  }

  setAuth(username: string, password: string): void {
    this.authHeader = `Basic ${btoa(`${username}:${password}`)}`;
    localStorage.setItem('authHeader', this.authHeader);
  }


  clearAuth(): void {
    this.authHeader = null;
    localStorage.removeItem('authHeader');
  }


  getAuthHeader(): string | null {
    return this.authHeader;
  }


  isAuthenticated(): boolean {
    return this.authHeader !== null;
  }
}

const authService = new AuthService();
export default authService;
