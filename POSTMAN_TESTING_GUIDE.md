# Postman Testing Guide for WeFix Backend API

## Base URL
```
http://localhost:4000
```

---

## 1. Testing GraphQL Endpoint

### Setup
- **Method**: `POST`
- **URL**: `http://localhost:4000/graphql`
- **Headers**:
  ```
  Content-Type: application/json
  ```

### Example 1: Simple Query - Get All Lookups

**Request Body (GraphQL)**:
```json
{
  "query": "query { getAllLookups { id name nameArabic category isActive } }"
}
```

**Expected Response**: Array of lookup objects

---

### Example 2: Query with Parameters - Get Lookups by Category

**Request Body (GraphQL)**:
```json
{
  "query": "query { getLookupsByCategory(category: COUNTRY) { id name nameArabic category } }"
}
```

**Available Categories**: `COUNTRY`, `ESTABLISHED_TYPE`, `TEAM_LEADER`, `USER_ROLE`, `BUSINESS_MODEL`, `MANAGED_BY`, `STATE`

---

### Example 3: Get All Companies

**Request Body (GraphQL)**:
```json
{
  "query": "query { getCompanies(filter: { limit: 10, page: 1 }) { companies { id title companyId companyNameEnglish isActive } totalCount } }"
}
```

---

### Example 4: Get Company by ID

**Request Body (GraphQL)**:
```json
{
  "query": "query { getCompanyById(id: \"YOUR_COMPANY_ID_HERE\") { company { id title companyId } } }"
}
```

---

### Example 5: User Login Mutation

**Request Body (GraphQL)**:
```json
{
  "query": "mutation { login(loginData: { email: \"user@example.com\", password: \"password123\" }) { accessToken refreshToken expiresIn tokenType } }"
}
```

**Expected Response**:
```json
{
  "data": {
    "login": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "refresh_token_here",
      "expiresIn": 3600,
      "tokenType": "Bearer"
    }
  }
}
```

**Note**: Save the `accessToken` for authenticated requests!

---

### Example 6: Create Company (Authenticated)

**Request Body (GraphQL)**:
```json
{
  "query": "mutation { createCompany(companyData: { title: \"Test Company\", companyId: \"COMP001\", establishedType: LLC, isActive: ACTIVE }) { company { id title companyId } success message } }"
}
```

**Headers** (if authentication required):
```
Content-Type: application/json
Authorization: Bearer YOUR_ACCESS_TOKEN_HERE
```

---

### Example 7: Get All Users

**Request Body (GraphQL)**:
```json
{
  "query": "query { getAllUsers { users { id firstName lastName email userRole } totalCount } }"
}
```

---

### Example 8: Get All Countries

**Request Body (GraphQL)**:
```json
{
  "query": "query { getCountries { id name code isActive } }"
}
```

---

## 2. Testing RESTful Endpoints

### Upload File Endpoint

**Setup**:
- **Method**: `POST`
- **URL**: `http://localhost:4000/upload`
- **Body Type**: `form-data`

**Fields**:
- `file` (File): Select a file to upload
- `filename` (Text): Name for the file
- `chunkIndex` (Text): Chunk index number (e.g., "0")
- `totalChunks` (Text): Total number of chunks (e.g., "1")

**Example**:
```
file: [Select File]
filename: test-document.pdf
chunkIndex: 0
totalChunks: 1
```

**Expected Response**:
```json
{
  "fileReference": "path/to/file",
  "message": "Chunk processed"
}
```

---

## 3. Quick Health Check

### Test if Server is Running

**Method**: `GET`
**URL**: `http://localhost:4000/graphql`

**Expected**: Should return a response (even if it's an error about missing query, that means server is running!)

Or use this simple GraphQL introspection query:

**Method**: `POST`
**URL**: `http://localhost:4000/graphql`
**Body**:
```json
{
  "query": "{ __schema { queryType { name } } }"
}
```

**Expected Response**:
```json
{
  "data": {
    "__schema": {
      "queryType": {
        "name": "Query"
      }
    }
  }
}
```

---

## 4. Postman Collection Setup Tips

### Create a Postman Collection

1. **Create New Collection**: "WeFix Backend API"
2. **Add Environment Variables**:
   - `base_url`: `http://localhost:4000`
   - `access_token`: (will be set after login)

### Setup Pre-request Script (for authenticated requests)

In your collection or request, add this pre-request script:
```javascript
// Auto-use access token if available
if (pm.environment.get("access_token")) {
    pm.request.headers.add({
        key: "Authorization",
        value: "Bearer " + pm.environment.get("access_token")
    });
}
```

### Setup Test Script (to save tokens)

For the login request, add this test script:
```javascript
if (pm.response.code === 200) {
    var jsonData = pm.response.json();
    if (jsonData.data && jsonData.data.login) {
        pm.environment.set("access_token", jsonData.data.login.accessToken);
        pm.environment.set("refresh_token", jsonData.data.login.refreshToken);
    }
}
```

---

## 5. Common GraphQL Queries Reference

### Get All Active Main Services
```json
{
  "query": "query { getActiveMainServices { id name nameArabic code isActive } }"
}
```

### Get Active Sub Services by Main Service
```json
{
  "query": "query { getActiveSubServicesByMainServiceId(mainServiceId: \"SERVICE_ID\") { id name nameArabic code } }"
}
```

### Get Branches by Company ID
```json
{
  "query": "query { getBranchesByCompanyId(companyId: \"COMPANY_ID\") { id branchTitle branchNameEnglish isActive } }"
}
```

### Get Contracts with Filter
```json
{
  "query": "query { getContracts(filter: { limit: 10, page: 1, businessModel: \"MODEL_NAME\" }) { contracts { id contractReference contractTitle } totalCount } }"
}
```

---

## 6. Troubleshooting

### Issue: CORS Error
**Solution**: Make sure you're testing from allowed origins or disable CORS temporarily for testing.

### Issue: 400 Bad Request
- Check if your GraphQL query syntax is correct
- Verify all required fields are provided
- Check Content-Type header is `application/json`

### Issue: 401 Unauthorized
- Make sure you're sending the Authorization header with Bearer token
- Verify your token hasn't expired
- Try logging in again to get a new token

### Issue: Connection Refused
- Verify the server is running on port 4000
- Check if the port is not blocked by firewall
- Verify database connection is working

---

## 7. Testing Checklist

- [ ] Server is running (check port 4000)
- [ ] Database connection is working
- [ ] GraphQL endpoint responds to introspection query
- [ ] Can execute simple queries (getAllLookups)
- [ ] Can execute queries with parameters
- [ ] Can execute mutations (login, createCompany, etc.)
- [ ] File upload endpoint works
- [ ] Authentication works (login and use token)

---

## Quick Test Commands

### Using cURL (if you prefer command line):

**Test GraphQL**:
```bash
curl -X POST http://localhost:4000/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ getAllLookups { id name } }"}'
```

**Test Login**:
```bash
curl -X POST http://localhost:4000/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "mutation { login(loginData: { email: \"test@example.com\", password: \"password\" }) { accessToken } }"}'
```

