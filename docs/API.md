# Travel Agency API Contract

> Status: proposed contract. The repository currently contains an Angular UI and SSR server only; these routes are not implemented yet. This document defines the API the screens need so frontend, backend, and database work can proceed against the same shapes.

## 1. Conventions

### Base URL

```text
/api/v1
```

Use an environment-specific origin for the frontend, for example `http://localhost:4200/api/v1` during local development and `https://api.golobe.com/v1` in production.

### Transport and format

- JSON request and response bodies, except ticket downloads (`application/pdf`).
- JSON property names use `camelCase`.
- Resource IDs are opaque strings. Examples use prefixes such as `usr_`, `flt_`, `htl_`, and `bkg_` for readability.
- Dates use `YYYY-MM-DD`; timestamps use ISO 8601 with a timezone, preferably UTC.
- Prices use the `Money` object. `amount` is an integer in the currency's minor unit, so `$240.00` is `24000` in `USD`.
- Unknown fields must be ignored by clients to keep later additions backward compatible.

### Authentication

- Protected routes require `Authorization: Bearer <accessToken>`.
- The access token is short-lived. Refresh it with `POST /auth/refresh`.
- Refresh tokens are preferably stored in an `HttpOnly`, `Secure`, `SameSite=Lax` cookie and must never be exposed to Angular JavaScript.
- Public routes are marked `Auth: no` in the endpoint index.

### Response envelopes

Single resource:

```json
{
  "data": { "id": "bkg_01J..." }
}
```

Collection:

```json
{
  "data": [],
  "meta": {
    "page": 1,
    "pageSize": 20,
    "totalItems": 0,
    "totalPages": 0
  }
}
```

Error:

```json
{
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "The request contains invalid fields.",
    "details": [
      { "field": "checkOut", "message": "checkOut must be after checkIn." }
    ],
    "requestId": "req_01J..."
  }
}
```

Search responses may add a `facets` object for filter controls:

```json
{
  "data": [],
  "meta": { "page": 1, "pageSize": 20, "totalItems": 42, "totalPages": 3 },
  "facets": {
    "priceRange": { "min": { "amount": 30000, "currency": "USD" }, "max": { "amount": 120000, "currency": "USD" } },
    "airlines": [{ "value": "EK", "label": "Emirates", "count": 12 }],
    "stops": [{ "value": 0, "label": "Non-stop", "count": 8 }]
  }
}
```

### Status codes

| Code | Meaning |
| --- | --- |
| `200` | Request succeeded |
| `201` | Resource created |
| `202` | Request accepted for asynchronous processing, such as sending a reset code |
| `204` | Request succeeded with no response body |
| `400` | Malformed request |
| `401` | Missing, invalid, or expired authentication |
| `403` | Authenticated but not allowed to access the resource |
| `404` | Resource not found |
| `409` | Conflict, such as an already-used email or sold-out room |
| `422` | Validation failed |
| `429` | Rate limited |
| `500` | Unexpected server error |

### Idempotency

`POST /bookings/flights`, `POST /bookings/hotels`, and `POST /bookings/:bookingId/payments` should accept:

```text
Idempotency-Key: <client-generated-uuid>
```

Repeating the same request with the same key and body must return the original result rather than create a duplicate booking or charge.

## 2. Endpoint Index

| # | Area | Method | Endpoint | Auth | Purpose |
| --- | --- | --- | --- | --- | --- |
| 1 | Auth | `POST` | `/auth/register` | no | Create an account |
| 2 | Auth | `POST` | `/auth/login` | no | Email/password login |
| 3 | Auth | `POST` | `/auth/social` | no | Google, Facebook, or Apple login |
| 4 | Auth | `POST` | `/auth/refresh` | no | Rotate the access token |
| 5 | Auth | `POST` | `/auth/logout` | yes | Revoke the current session |
| 6 | Auth | `POST` | `/auth/forgot-password` | no | Send a reset code |
| 7 | Auth | `POST` | `/auth/verify-reset-code` | no | Exchange a code for a reset token |
| 8 | Auth | `POST` | `/auth/reset-password` | no | Set a new password |
| 9 | Profile | `GET` | `/users/me` | yes | Current user |
| 10 | Profile | `PATCH` | `/users/me` | yes | Update profile fields |
| 11 | Profile | `PATCH` | `/users/me/password` | yes | Change password |
| 12 | Profile | `POST` | `/users/me/emails` | yes | Add a secondary email |
| 13 | Profile | `GET` | `/users/me/sessions` | yes | List active sessions |
| 14 | Profile | `DELETE` | `/users/me/sessions/:sessionId` | yes | Revoke a session |
| 15 | Profile | `GET` | `/users/me/export` | yes | Request a data export |
| 16 | Preferences | `GET` | `/users/me/preferences` | yes | Read all settings |
| 17 | Preferences | `PATCH` | `/users/me/preferences` | yes | Update settings |
| 18 | Discovery | `GET` | `/locations/autocomplete` | no | Airport, city, hotel, destination suggestions |
| 19 | Discovery | `GET` | `/destinations` | no | Home-page destination cards |
| 20 | Discovery | `GET` | `/tours` | no | Featured packages and tour cards |
| 21 | Discovery | `POST` | `/promotions/validate` | no | Validate a promo code |
| 22 | Flights | `GET` | `/flights/search` | no | Search flight offers |
| 23 | Flights | `GET` | `/flights/:offerId` | no | Flight details |
| 24 | Stays | `GET` | `/hotels/search` | no | Search hotels |
| 25 | Stays | `GET` | `/hotels/:hotelId` | no | Hotel details |
| 26 | Stays | `GET` | `/hotels/:hotelId/rooms` | no | Available rooms for stay dates |
| 27 | Stays | `GET` | `/hotels/:hotelId/reviews` | no | Paged hotel reviews |
| 28 | Bookings | `POST` | `/bookings/flights` | yes | Create a flight booking |
| 29 | Bookings | `POST` | `/bookings/hotels` | yes | Create a hotel booking |
| 30 | Bookings | `GET` | `/bookings` | yes | List tickets and bookings |
| 31 | Bookings | `GET` | `/bookings/:bookingId` | yes | Booking details |
| 32 | Bookings | `GET` | `/bookings/:bookingId/ticket` | yes | Download or open a ticket |
| 33 | Bookings | `POST` | `/bookings/:bookingId/payments` | yes | Pay or retry payment |
| 34 | Bookings | `POST` | `/bookings/:bookingId/cancel` | yes | Cancel a booking |
| 35 | Payments | `GET` | `/payment-methods` | yes | List saved cards |
| 36 | Payments | `POST` | `/payment-methods` | yes | Save a payment method |
| 37 | Payments | `DELETE` | `/payment-methods/:paymentMethodId` | yes | Remove a saved card |
| 38 | Favourites | `GET` | `/favourites` | yes | List saved flights and hotels |
| 39 | Favourites | `POST` | `/favourites` | yes | Save a flight or hotel |
| 40 | Favourites | `DELETE` | `/favourites/:favouriteId` | yes | Remove a favourite |

Admin, inventory-management, and supplier endpoints are intentionally excluded. They are not needed by the current customer-facing screens.

## 3. Authentication

### `POST /auth/register`

Auth: no

Creates the account from `create-account.html`. Payment-card details are collected later in the signup UI and must be sent separately to `POST /payment-methods`; they are not part of registration.

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@gmail.com",
  "phone": "+10000000000",
  "password": "S3cure!pass",
  "passwordConfirmation": "S3cure!pass",
  "acceptedTerms": true
}
```

`201 Created`

```json
{
  "data": {
    "user": {
      "id": "usr_01JABCDEF",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@gmail.com",
      "phone": "+10000000000",
      "avatarUrl": null,
      "dateOfBirth": null,
      "address": null,
      "emailVerified": false,
      "createdAt": "2026-11-11T10:15:00Z",
      "updatedAt": "2026-11-11T10:15:00Z"
    },
    "accessToken": "eyJ...",
    "expiresIn": 900
  }
}
```

### `POST /auth/login`

Auth: no

```json
{
  "email": "john.doe@gmail.com",
  "password": "S3cure!pass",
  "rememberMe": true
}
```

`200 OK`

```json
{
  "data": {
    "user": {},
    "accessToken": "eyJ...",
    "expiresIn": 900
  }
}
```

The refresh token is set as an `HttpOnly` cookie. `rememberMe` controls its lifetime.

### `POST /auth/social`

Auth: no

Used by the Google, Facebook, and Apple buttons.

```json
{
  "provider": "google",
  "idToken": "eyJ...",
  "redirectUri": "https://golobe.com/auth/callback"
}
```

`200 OK` or `201 Created` if a new user was provisioned. Body is the same `AuthSession` as login.

### `POST /auth/refresh`

Auth: no; reads the refresh cookie.

Request body: empty.

`200 OK`

```json
{
  "data": {
    "accessToken": "eyJ...",
    "expiresIn": 900
  }
}
```

Rotate the refresh token when issuing a new access token.

### `POST /auth/logout`

Auth: yes

Request body: empty.

`204 No Content`. Revoke the current session and clear the refresh cookie.

### `POST /auth/forgot-password`

Auth: no

```json
{
  "email": "john.doe@gmail.com"
}
```

`202 Accepted`

```json
{
  "data": {
    "message": "If an account exists for this email, a reset code has been sent."
  }
}
```

Always return the same message to avoid revealing whether an email is registered.

### `POST /auth/verify-reset-code`

Auth: no

```json
{
  "email": "john.doe@gmail.com",
  "code": "482915"
}
```

`200 OK`

```json
{
  "data": {
    "resetToken": "rst_01J...",
    "expiresIn": 600
  }
}
```

### `POST /auth/reset-password`

Auth: no

```json
{
  "resetToken": "rst_01J...",
  "password": "N3wS3cure!pass",
  "passwordConfirmation": "N3wS3cure!pass"
}
```

`200 OK`

```json
{
  "data": {
    "message": "Password updated. Please sign in."
  }
}
```

## 4. Profile and Preferences

### `GET /users/me`

Auth: yes

Used by the header, account page, and booking forms.

`200 OK`

```json
{
  "data": {
    "id": "usr_01JABCDEF",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@gmail.com",
    "pendingEmail": null,
    "phone": "+10000000000",
    "avatarUrl": "https://cdn.golobe.com/avatars/john.jpg",
    "dateOfBirth": "1992-01-01",
    "address": {
      "line1": "St 32 main downtown",
      "line2": null,
      "city": "Los Angeles",
      "state": "California",
      "postalCode": "90012",
      "countryCode": "US"
    },
    "emailVerified": true,
    "createdAt": "2024-02-04T08:30:00Z",
    "updatedAt": "2026-11-11T10:15:00Z"
  }
}
```

### `PATCH /users/me`

Auth: yes

Send only the fields being changed. Changing `email` sets `pendingEmail` and starts verification; the active `email` remains unchanged until verification succeeds.

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+10000000000",
  "dateOfBirth": "1992-01-01",
  "address": {
    "line1": "St 32 main downtown",
    "line2": null,
    "city": "Los Angeles",
    "state": "California",
    "postalCode": "90012",
    "countryCode": "US"
  },
  "email": "new-email@example.com"
}
```

`200 OK` with the updated `User`.

### `PATCH /users/me/password`

Auth: yes

```json
{
  "currentPassword": "S3cure!pass",
  "newPassword": "N3wS3cure!pass",
  "newPasswordConfirmation": "N3wS3cure!pass"
}
```

`204 No Content`. Revoke all other sessions after a password change.

### `POST /users/me/emails`

Auth: yes

Supports the "Add another email" action on the account page.

```json
{
  "email": "secondary@example.com"
}
```

`201 Created`

```json
{
  "data": {
    "email": "secondary@example.com",
    "verified": false,
    "verificationSentAt": "2026-11-11T10:20:00Z"
  }
}
```

### `GET /users/me/sessions`

Auth: yes

`200 OK`

```json
{
  "data": [
    {
      "id": "ses_01J...",
      "device": "Chrome on macOS",
      "ipAddress": "203.0.113.10",
      "location": "Lagos, NG",
      "current": true,
      "lastActiveAt": "2026-11-11T10:20:00Z",
      "createdAt": "2026-11-01T08:00:00Z"
    }
  ]
}
```

### `DELETE /users/me/sessions/:sessionId`

Auth: yes

`204 No Content`. Revoking the current session also signs the user out.

### `GET /users/me/export`

Auth: yes

`202 Accepted`

```json
{
  "data": {
    "status": "processing",
    "downloadUrl": null,
    "expiresAt": null
  }
}
```

When ready, the returned URL is short-lived and contains the user's profile, preferences, bookings, and favourites.

### `GET /users/me/preferences`

Auth: yes

Represents every setting on `settings.html`.

`200 OK`

```json
{
  "data": {
    "notifications": {
      "bookingUpdates": true,
      "priceAlerts": true,
      "deals": false,
      "productNews": false
    },
    "travel": {
      "showTaxesUpfront": true,
      "autoCheckIn": false,
      "currency": "USD",
      "language": "en-GB",
      "seatPreference": "window"
    },
    "appearance": {
      "theme": "system",
      "density": "comfortable"
    },
    "privacy": {
      "twoFactorEnabled": true,
      "saveSearchHistory": true,
      "personalisedRecommendations": true
    },
    "updatedAt": "2026-11-11T10:20:00Z"
  }
}
```

### `PATCH /users/me/preferences`

Auth: yes

Deep-merge the supplied sections. Omitted fields remain unchanged.

```json
{
  "notifications": {
    "deals": true
  },
  "travel": {
    "currency": "NGN",
    "seatPreference": "aisle"
  },
  "appearance": {
    "density": "compact"
  },
  "privacy": {
    "saveSearchHistory": false
  }
}
```

`200 OK` with the full updated preference object.

## 5. Discovery and Catalogue

### `GET /locations/autocomplete`

Auth: no

Powers the "From - To", "Enter Destination", and hotel-location fields.

| Query parameter | Type | Required | Notes |
| --- | --- | --- | --- |
| `q` | string | yes | Minimum 2 characters |
| `type` | `flight` or `stay` | yes | Limits the result types |
| `limit` | integer | no | Default `8`, maximum `20` |

Example:

```text
GET /api/v1/locations/autocomplete?q=ist&type=stay&limit=8
```

`200 OK`

```json
{
  "data": [
    {
      "id": "loc_istanbul",
      "type": "city",
      "label": "Istanbul, Turkey",
      "city": "Istanbul",
      "countryCode": "TR",
      "iataCode": "IST",
      "hotelId": null,
      "destinationId": "istanbul"
    },
    {
      "id": "htl_cvk_bosphorus",
      "type": "hotel",
      "label": "CVK Park Bosphorus Hotel Istanbul",
      "city": "Istanbul",
      "countryCode": "TR",
      "iataCode": null,
      "hotelId": "htl_01J...",
      "destinationId": null
    }
  ]
}
```

### `GET /destinations`

Auth: no

Returns the cards in the home-page "Fall into travel" section.

| Query parameter | Type | Required | Notes |
| --- | --- | --- | --- |
| `featured` | boolean | no | Default `true` |
| `limit` | integer | no | Default `9`, maximum `50` |

`200 OK`

```json
{
  "data": [
    {
      "id": "istanbul",
      "name": "Istanbul",
      "country": "Turkey",
      "description": "Flights - Hotels - Resorts",
      "imageUrl": "https://cdn.golobe.com/destinations/istanbul.jpg",
      "tourCount": 18
    },
    {
      "id": "sydney",
      "name": "Sydney",
      "country": "Australia",
      "description": "Flights - Hotels - Resorts",
      "imageUrl": "https://cdn.golobe.com/destinations/sydney.jpg",
      "tourCount": 12
    }
  ]
}
```

### `GET /tours`

Auth: no

Returns the package cards in the home-page "Fall out of travel" section.

| Query parameter | Type | Required | Notes |
| --- | --- | --- | --- |
| `destinationId` | string | no | Filter by destination |
| `featured` | boolean | no | Default `true` for the home page |
| `page` | integer | no | Default `1` |
| `pageSize` | integer | no | Default `12`, maximum `50` |

`200 OK`

```json
{
  "data": [
    {
      "id": "tour_paris_weekend",
      "destinationId": "paris",
      "title": "A Paris Adventure",
      "description": "An amazing journey through Paris.",
      "durationDays": 4,
      "price": { "amount": 60000, "currency": "USD" },
      "imageUrl": "https://cdn.golobe.com/tours/paris.jpg"
    }
  ],
  "meta": {
    "page": 1,
    "pageSize": 12,
    "totalItems": 1,
    "totalPages": 1
  }
}
```

### `POST /promotions/validate`

Auth: no

Called after the user presses "Apply" on a promo code. The result is informational until the booking endpoint revalidates it.

```json
{
  "code": "GOLOBE10",
  "context": "flight",
  "subtotal": { "amount": 42000, "currency": "USD" }
}
```

`200 OK`

```json
{
  "data": {
    "code": "GOLOBE10",
    "valid": true,
    "description": "10% off the base fare",
    "discount": { "amount": 4200, "currency": "USD" },
    "finalTotal": { "amount": 37800, "currency": "USD" },
    "expiresAt": "2026-12-31T23:59:59Z"
  }
}
```

An invalid or expired code returns `200 OK` with `valid: false`, no discount, and a human-readable `reason`. This lets the UI show the message without treating it as a server failure.

## 6. Flights

### `GET /flights/search`

Auth: no

Returns offers for `flightlisting.html`. Query parameters map directly to the search form and filter sidebar.

| Query parameter | Type | Required | Notes |
| --- | --- | --- | --- |
| `origin` | string | yes | IATA code or location ID |
| `destination` | string | yes | IATA code or location ID |
| `departureDate` | date | yes | `YYYY-MM-DD` |
| `returnDate` | date | conditional | Required for `return` trips |
| `tripType` | enum | no | `oneWay`, `return`, `multiCity`; default `return` |
| `adults` | integer | no | Default `1` |
| `children` | integer | no | Default `0` |
| `infants` | integer | no | Default `0` |
| `cabinClass` | enum | no | `economy`, `premiumEconomy`, `business`, `first` |
| `currency` | string | no | ISO 4217; default from user preferences, otherwise `USD` |
| `stops` | string | no | CSV of `0`, `1`, `2+` |
| `airlines` | string | no | CSV of IATA airline codes |
| `minPrice` | integer | no | Minor currency units |
| `maxPrice` | integer | no | Minor currency units |
| `departureTimeFrom` | string | no | `HH:mm` |
| `departureTimeTo` | string | no | `HH:mm` |
| `sort` | enum | no | `cheapest`, `best`, `quickest`, `recommended` |
| `page` | integer | no | Default `1` |
| `pageSize` | integer | no | Default `20`, maximum `50` |

Example:

```text
GET /api/v1/flights/search?origin=LHE&destination=DXB&departureDate=2026-12-07&returnDate=2026-12-13&tripType=return&adults=1&cabinClass=economy&currency=USD&sort=cheapest&page=1&pageSize=20
```

`200 OK`

```json
{
  "data": [
    {
      "id": "flt_01J9Z8K2",
      "airline": {
        "iataCode": "EK",
        "name": "Emirates",
        "logoUrl": "https://cdn.golobe.com/airlines/ek.svg"
      },
      "flightNumber": "EK 205",
      "aircraft": "Airbus A330",
      "origin": {
        "iataCode": "LHE",
        "name": "Allama Iqbal International Airport",
        "city": "Lahore",
        "countryCode": "PK"
      },
      "destination": {
        "iataCode": "DXB",
        "name": "Dubai International Airport",
        "city": "Dubai",
        "countryCode": "AE"
      },
      "departureAt": "2026-12-07T09:50:00Z",
      "arrivalAt": "2026-12-07T12:10:00Z",
      "durationMinutes": 140,
      "stops": 0,
      "cabinClass": "economy",
      "price": { "amount": 42000, "currency": "USD" },
      "rating": 4.8,
      "reviewCount": 54,
      "badge": "Best value",
      "isFeatured": true,
      "imageUrl": "https://cdn.golobe.com/flights/ek-a330.jpg",
      "baggage": {
        "carryOn": "1 x 7kg",
        "checked": "1 x 23kg"
      }
    }
  ],
  "meta": {
    "page": 1,
    "pageSize": 20,
    "totalItems": 37,
    "totalPages": 2
  },
  "facets": {
    "priceRange": {
      "min": { "amount": 39000, "currency": "USD" },
      "max": { "amount": 120000, "currency": "USD" }
    },
    "airlines": [
      { "value": "EK", "label": "Emirates", "count": 12 },
      { "value": "QR", "label": "Qatar Airways", "count": 9 }
    ],
    "stops": [
      { "value": 0, "label": "Non-stop", "count": 8 },
      { "value": 1, "label": "1 stop", "count": 21 }
    ]
  }
}
```

### `GET /flights/:offerId`

Auth: no

Powers `flightdetails.html`. Accepts the same `currency` query parameter as search.

Example:

```text
GET /api/v1/flights/flt_01J9Z8K2?currency=USD
```

`200 OK`

```json
{
  "data": {
    "id": "flt_01J9Z8K2",
    "airline": {
      "iataCode": "EK",
      "name": "Emirates",
      "logoUrl": "https://cdn.golobe.com/airlines/ek.svg"
    },
    "flightNumber": "EK 205",
    "aircraft": "Airbus A330",
    "origin": {
      "iataCode": "LHE",
      "name": "Allama Iqbal International Airport",
      "city": "Lahore",
      "countryCode": "PK"
    },
    "destination": {
      "iataCode": "DXB",
      "name": "Dubai International Airport",
      "city": "Dubai",
      "countryCode": "AE"
    },
    "departureAt": "2026-12-07T09:50:00Z",
    "arrivalAt": "2026-12-07T12:10:00Z",
    "durationMinutes": 140,
    "stops": 0,
    "cabinClass": "economy",
    "price": { "amount": 42000, "currency": "USD" },
    "rating": 4.8,
    "reviewCount": 54,
    "badge": "Best value",
    "isFeatured": true,
    "imageUrl": "https://cdn.golobe.com/flights/ek-a330.jpg",
    "galleryImages": [
      "https://cdn.golobe.com/flights/ek-cabin-1.jpg",
      "https://cdn.golobe.com/flights/ek-cabin-2.jpg"
    ],
    "segments": [
      {
        "id": "seg_1",
        "flightNumber": "EK 205",
        "airline": { "iataCode": "EK", "name": "Emirates" },
        "aircraft": "Airbus A330",
        "origin": { "iataCode": "LHE", "city": "Lahore" },
        "destination": { "iataCode": "DXB", "city": "Dubai" },
        "departureAt": "2026-12-07T09:50:00Z",
        "arrivalAt": "2026-12-07T12:10:00Z",
        "durationMinutes": 140,
        "terminal": "3",
        "gate": "A12"
      }
    ],
    "baggage": {
      "carryOn": "1 x 7kg",
      "checked": "1 x 23kg"
    },
    "amenities": ["Wi-Fi", "Power outlet", "In-flight entertainment", "Meal included"],
    "policies": [
      "Pre-flight cleaning and cabin HEPA filters.",
      "Pre-flight health screening questions."
    ],
    "refundable": false,
    "changeable": true,
    "seatsRemaining": 6
  }
}
```

## 7. Stays

### `GET /hotels/search`

Auth: no

Returns hotels for `hotellisting.html`.

| Query parameter | Type | Required | Notes |
| --- | --- | --- | --- |
| `destination` | string | yes | City, hotel ID, or location ID |
| `checkIn` | date | yes | `YYYY-MM-DD` |
| `checkOut` | date | yes | Must be later than `checkIn` |
| `rooms` | integer | no | Default `1` |
| `adults` | integer | no | Default `2` |
| `children` | integer | no | Default `0` |
| `propertyType` | string | no | CSV of `hotel`, `motel`, `resort` |
| `minPrice` | integer | no | Price per night in minor currency units |
| `maxPrice` | integer | no | Price per night in minor currency units |
| `rating` | number | no | Minimum rating, for example `4` |
| `freebies` | string | no | CSV such as `breakfast`, `parking`, `internet`, `airportShuttle`, `freeCancellation` |
| `amenities` | string | no | CSV such as `frontDesk24h`, `airConditioning`, `fitness`, `pool` |
| `currency` | string | no | ISO 4217 |
| `sort` | enum | no | `cheapest`, `best`, `recommended` |
| `page` | integer | no | Default `1` |
| `pageSize` | integer | no | Default `20`, maximum `50` |

Example:

```text
GET /api/v1/hotels/search?destination=Istanbul%2C%20Turkey&checkIn=2026-12-02&checkOut=2026-12-04&rooms=1&adults=2&children=0&currency=USD&sort=recommended&page=1&pageSize=20
```

`200 OK`

```json
{
  "data": [
    {
      "id": "htl_01JCVK",
      "name": "CVK Park Bosphorus Hotel Istanbul",
      "location": "Gumussuyu Mah. Inonu Cad. No:8, Istanbul 34437",
      "category": "5 Star Hotel",
      "stars": 5,
      "rating": 4.8,
      "reviewCount": 2847,
      "pricePerNight": { "amount": 24000, "currency": "USD" },
      "priceNote": "excl. tax",
      "totalPrice": { "amount": 48000, "currency": "USD" },
      "imageUrl": "https://cdn.golobe.com/hotels/cvk.jpg",
      "imageCount": 9,
      "official": false,
      "amenities": ["Free Wi-Fi", "Pool", "Spa", "Fitness center"],
      "freeCancellation": true
    }
  ],
  "meta": {
    "page": 1,
    "pageSize": 20,
    "totalItems": 257,
    "totalPages": 13
  },
  "facets": {
    "priceRange": {
      "min": { "amount": 5000, "currency": "USD" },
      "max": { "amount": 120000, "currency": "USD" }
    },
    "propertyTypes": [
      { "value": "hotel", "label": "Hotels", "count": 257 },
      { "value": "motel", "label": "Motels", "count": 51 },
      { "value": "resort", "label": "Resorts", "count": 72 }
    ],
    "ratings": [
      { "value": 4, "label": "4+", "count": 112 }
    ]
  }
}
```

### `GET /hotels/:hotelId`

Auth: no

Powers `hoteldetails.html`. Pass the stay criteria so the detail response can return availability and correct totals.

| Query parameter | Type | Required |
| --- | --- | --- |
| `checkIn` | date | yes |
| `checkOut` | date | yes |
| `rooms` | integer | no |
| `adults` | integer | no |
| `children` | integer | no |
| `currency` | string | no |

`200 OK`

```json
{
  "data": {
    "id": "htl_01JCVK",
    "name": "CVK Park Bosphorus Hotel Istanbul",
    "category": "5 Star Hotel",
    "stars": 5,
    "rating": 4.2,
    "ratingLabel": "Very good",
    "reviewCount": 371,
    "description": "Located in Taksim Gumussuyu, the heart of Istanbul...",
    "address": "Gumussuyu Mah. Inonu Cad. No:8, Istanbul 34437",
    "geo": { "latitude": 41.037, "longitude": 28.985 },
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=CVK+Park+Bosphorus+Hotel+Istanbul",
    "images": [
      "https://cdn.golobe.com/hotels/cvk-1.jpg",
      "https://cdn.golobe.com/hotels/cvk-2.jpg"
    ],
    "tags": ["Near park", "Near nightlife", "Near theater", "Clean hotel"],
    "amenities": [
      { "key": "pool", "label": "Outdoor pool" },
      { "key": "fitness", "label": "Fitness center" },
      { "key": "wifi", "label": "Free Wi-Fi" },
      { "key": "spa", "label": "Spa and wellness center" }
    ],
    "checkInTime": "12:00",
    "checkOutTime": "11:30",
    "policies": [
      "Free cancellation until 48 hours before check-in.",
      "Pets are not allowed."
    ],
    "pricePerNight": { "amount": 24000, "currency": "USD" },
    "rooms": []
  }
}
```

The `rooms` array can be populated from the rooms endpoint. Keeping it on the detail response avoids an extra round trip when the room list is small.

### `GET /hotels/:hotelId/rooms`

Auth: no

| Query parameter | Type | Required |
| --- | --- | --- |
| `checkIn` | date | yes |
| `checkOut` | date | yes |
| `rooms` | integer | no |
| `adults` | integer | no |
| `children` | integer | no |
| `currency` | string | no |

`200 OK`

```json
{
  "data": [
    {
      "id": "room_superior_double",
      "name": "Superior room - 1 double bed or 2 twin beds",
      "description": "City-facing room with breakfast included.",
      "imageUrl": "https://cdn.golobe.com/hotels/rooms/superior.jpg",
      "pricePerNight": { "amount": 24000, "currency": "USD" },
      "totalPrice": { "amount": 48000, "currency": "USD" },
      "bedType": "1 double bed or 2 twin beds",
      "maxOccupancy": 2,
      "breakfastIncluded": true,
      "freeCancellation": true,
      "refundable": true,
      "roomsRemaining": 4
    }
  ]
}
```

### `GET /hotels/:hotelId/reviews`

Auth: no

| Query parameter | Type | Required | Notes |
| --- | --- | --- | --- |
| `page` | integer | no | Default `1` |
| `pageSize` | integer | no | Default `5`, maximum `50` |
| `sort` | enum | no | `recent`, `highest`, `lowest` |

`200 OK`

```json
{
  "data": [
    {
      "id": "rev_01J...",
      "score": 5.0,
      "label": "Amazing",
      "name": "Omar Siphron",
      "avatarUrl": "https://cdn.golobe.com/avatars/omar.jpg",
      "text": "Excellent location and very helpful staff.",
      "createdAt": "2026-10-18T14:00:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "pageSize": 5,
    "totalItems": 371,
    "totalPages": 75
  },
  "summary": {
    "rating": 4.2,
    "ratingLabel": "Very good",
    "reviewCount": 371
  }
}
```

## 8. Bookings

### `POST /bookings/flights`

Auth: yes

Creates the booking after the user selects a payment option and method on `bookingdetails.html`.

```json
{
  "offerId": "flt_01J9Z8K2",
  "contact": {
    "email": "john.doe@gmail.com",
    "phone": "+10000000000"
  },
  "passengers": [
    {
      "firstName": "John",
      "lastName": "Doe",
      "dateOfBirth": "1992-01-01",
      "type": "adult",
      "nationality": "US",
      "passportNumber": "X12345678",
      "passportExpiry": "2030-05-20",
      "seatPreference": "window"
    }
  ],
  "paymentOption": "full",
  "paymentMethodId": "pm_01J...",
  "promoCode": "GOLOBE10",
  "specialRequests": "Vegetarian meal"
}
```

`paymentOption` is `full` or `partLater`. For `partLater`, the response includes the first and second charge schedule.

`201 Created`

```json
{
  "data": {
    "id": "bkg_01JFLIGHT",
    "reference": "ABC12345",
    "type": "flight",
    "status": "confirmed",
    "traveler": {
      "fullName": "John Doe",
      "email": "john.doe@gmail.com",
      "phone": "+10000000000"
    },
    "flight": {
      "offerId": "flt_01J9Z8K2",
      "airline": { "iataCode": "EK", "name": "Emirates" },
      "flightNumber": "EK 205",
      "origin": { "iataCode": "LHE", "city": "Lahore" },
      "destination": { "iataCode": "DXB", "city": "Dubai" },
      "departureAt": "2026-12-07T09:50:00Z",
      "arrivalAt": "2026-12-07T12:10:00Z",
      "durationMinutes": 140,
      "cabinClass": "economy"
    },
    "passengers": [
      { "firstName": "John", "lastName": "Doe", "type": "adult" }
    ],
    "pricing": {
      "baseFare": { "amount": 40000, "currency": "USD" },
      "discount": { "amount": 4200, "currency": "USD" },
      "taxes": { "amount": 2000, "currency": "USD" },
      "serviceFee": { "amount": 500, "currency": "USD" },
      "total": { "amount": 38300, "currency": "USD" }
    },
    "payment": {
      "option": "full",
      "status": "paid",
      "paidAmount": { "amount": 38300, "currency": "USD" },
      "dueAmount": { "amount": 0, "currency": "USD" },
      "nextChargeAt": null,
      "paymentMethodId": "pm_01J..."
    },
    "ticket": {
      "number": "176-1234567890",
      "seat": "12A",
      "gate": "A12",
      "boardingAt": "2026-12-07T09:10:00Z"
    },
    "createdAt": "2026-11-11T10:30:00Z",
    "updatedAt": "2026-11-11T10:30:00Z"
  }
}
```

If authorization is still processing, return `201 Created` with `status: "pending"` and `payment.status: "authorized"` or `"processing"`. The client should poll `GET /bookings/:bookingId`.

### `POST /bookings/hotels`

Auth: yes

Creates the stay after a room is selected on `hotelbookingdetails.html`.

```json
{
  "hotelId": "htl_01JCVK",
  "roomId": "room_superior_double",
  "checkIn": "2026-12-08",
  "checkOut": "2026-12-09",
  "roomCount": 1,
  "adults": 2,
  "children": 0,
  "guestName": "John Doe",
  "contact": {
    "email": "john.doe@gmail.com",
    "phone": "+10000000000"
  },
  "paymentOption": "partLater",
  "paymentMethodId": "pm_01J...",
  "promoCode": null,
  "specialRequests": "High floor if possible"
}
```

`201 Created`

```json
{
  "data": {
    "id": "bkg_01JHOTEL",
    "reference": "XYZ98765",
    "type": "stay",
    "status": "confirmed",
    "traveler": {
      "fullName": "John Doe",
      "email": "john.doe@gmail.com",
      "phone": "+10000000000"
    },
    "hotel": {
      "hotelId": "htl_01JCVK",
      "name": "CVK Park Bosphorus Hotel Istanbul",
      "address": "Gumussuyu Mah. Inonu Cad. No:8, Istanbul 34437",
      "imageUrl": "https://cdn.golobe.com/hotels/cvk.jpg"
    },
    "room": {
      "roomId": "room_superior_double",
      "name": "Superior room - 1 double bed or 2 twin beds",
      "roomNumber": "On arrival",
      "checkIn": "2026-12-08",
      "checkOut": "2026-12-09",
      "checkInTime": "12:00",
      "checkOutTime": "11:30"
    },
    "guests": {
      "adults": 2,
      "children": 0,
      "roomCount": 1
    },
    "pricing": {
      "baseFare": { "amount": 24000, "currency": "USD" },
      "discount": { "amount": 0, "currency": "USD" },
      "taxes": { "amount": 2000, "currency": "USD" },
      "serviceFee": { "amount": 500, "currency": "USD" },
      "total": { "amount": 26500, "currency": "USD" }
    },
    "payment": {
      "option": "partLater",
      "status": "partiallyPaid",
      "paidAmount": { "amount": 13250, "currency": "USD" },
      "dueAmount": { "amount": 13250, "currency": "USD" },
      "nextChargeAt": "2026-11-14T10:30:00Z",
      "paymentMethodId": "pm_01J..."
    },
    "createdAt": "2026-11-11T10:35:00Z",
    "updatedAt": "2026-11-11T10:35:00Z"
  }
}
```

### `GET /bookings`

Auth: yes

Powers the `Tickets/Bookings` tab. The UI's `Upcoming`, `Completed`, and `Cancelled` controls map to `view`.

| Query parameter | Type | Required | Notes |
| --- | --- | --- | --- |
| `type` | enum | no | `flights` or `stays`; omit for both |
| `view` | enum | no | `upcoming`, `completed`, `cancelled`; default `upcoming` |
| `page` | integer | no | Default `1` |
| `pageSize` | integer | no | Default `10`, maximum `50` |

Example:

```text
GET /api/v1/bookings?type=flights&view=upcoming&page=1&pageSize=10
```

`200 OK`

```json
{
  "data": [
    {
      "id": "bkg_01JFLIGHT",
      "reference": "ABC12345",
      "type": "flight",
      "status": "confirmed",
      "title": "Emirates EK 205",
      "subtitle": "LHE to DXB",
      "startAt": "2026-12-07T09:50:00Z",
      "endAt": "2026-12-07T12:10:00Z",
      "imageUrl": "https://cdn.golobe.com/flights/ek-a330.jpg",
      "total": { "amount": 38300, "currency": "USD" },
      "createdAt": "2026-11-11T10:30:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "pageSize": 10,
    "totalItems": 1,
    "totalPages": 1
  }
}
```

### `GET /bookings/:bookingId`

Auth: yes; the booking must belong to the current user.

`200 OK` with the full `Booking` object shown in the create responses, including `pricing`, `payment`, passengers or guests, and ticket details.

### `GET /bookings/:bookingId/ticket`

Auth: yes

Returns a downloadable ticket:

```text
200 OK
Content-Type: application/pdf
Content-Disposition: attachment; filename="ABC12345-ticket.pdf"
```

For hotel bookings, return the hotel voucher in the same format.

### `POST /bookings/:bookingId/payments`

Auth: yes

Pays a pending booking, retries a failed payment, or replaces a declined payment method.

```json
{
  "paymentMethodId": "pm_01J...",
  "paymentOption": "full"
}
```

`200 OK`

```json
{
  "data": {
    "status": "paid",
    "paidAmount": { "amount": 38300, "currency": "USD" },
    "dueAmount": { "amount": 0, "currency": "USD" },
    "nextChargeAt": null,
    "receiptUrl": "https://cdn.golobe.com/receipts/bkg_01JFLIGHT.pdf"
  }
}
```

### `POST /bookings/:bookingId/cancel`

Auth: yes

```json
{
  "reason": "Change of plans"
}
```

`200 OK`

```json
{
  "data": {
    "id": "bkg_01JFLIGHT",
    "status": "cancelled",
    "refund": {
      "status": "processing",
      "amount": { "amount": 38300, "currency": "USD" },
      "expectedBy": "2026-11-18T00:00:00Z"
    },
    "cancelledAt": "2026-11-11T11:00:00Z"
  }
}
```

Cancellation rules and refund amounts come from the fare or room policy. If the booking is non-refundable, return `refund.amount` as zero and explain the policy in `refund.message`.

## 9. Payment Methods

### `GET /payment-methods`

Auth: yes

Powers the saved-card list on the account page and the saved Visa option on booking pages.

`200 OK`

```json
{
  "data": [
    {
      "id": "pm_01J...",
      "brand": "visa",
      "last4": "4321",
      "expiryMonth": 2,
      "expiryYear": 2027,
      "isDefault": true,
      "createdAt": "2026-02-10T09:00:00Z"
    }
  ]
}
```

The API must never return the full card number or CVC.

### `POST /payment-methods`

Auth: yes

The "Add a new card" modal collects card number, expiry, CVC, name, and country. Tokenize those fields with the payment provider in the browser, then send only the provider token to this API.

```json
{
  "provider": "stripe",
  "providerPaymentMethodId": "pm_1QExampleToken",
  "setDefault": true
}
```

`201 Created`

```json
{
  "data": {
    "id": "pm_01J...",
    "brand": "visa",
    "last4": "4321",
    "expiryMonth": 2,
    "expiryYear": 2027,
    "isDefault": true,
    "createdAt": "2026-11-11T11:05:00Z"
  }
}
```

If the backend is PCI-compliant and does its own tokenization, the request may instead contain `cardNumber`, `expiryMonth`, `expiryYear`, `cvc`, `nameOnCard`, `countryCode`, and `saveForFutureUse`. Prefer provider tokenization so raw card data never reaches this API.

### `DELETE /payment-methods/:paymentMethodId`

Auth: yes

`204 No Content`. Reject deletion with `409 Conflict` if the card is needed for an upcoming scheduled payment, or require another default card first.

## 10. Favourites

### `GET /favourites`

Auth: yes

Powers the Flights and Places tabs on `favourites.html`.

| Query parameter | Type | Required | Notes |
| --- | --- | --- | --- |
| `type` | enum | no | `flight` or `hotel`; omit for both |
| `page` | integer | no | Default `1` |
| `pageSize` | integer | no | Default `12`, maximum `50` |

`200 OK`

```json
{
  "data": [
    {
      "id": "fav_01JHOTEL",
      "type": "hotel",
      "targetId": "htl_01JCVK",
      "createdAt": "2026-11-10T09:00:00Z",
      "hotel": {
        "id": "htl_01JCVK",
        "name": "CVK Park Bosphorus Hotel Istanbul",
        "location": "Gumussuyu Mah. Inonu Cad. No:8, Istanbul 34437",
        "category": "5 Star Hotel",
        "stars": 5,
        "rating": 4.2,
        "ratingLabel": "Very Good",
        "reviewCount": 371,
        "pricePerNight": { "amount": 24000, "currency": "USD" },
        "priceNote": "excl. tax",
        "imageUrl": "https://cdn.golobe.com/hotels/cvk.jpg",
        "imageCount": 9,
        "amenities": "20+ Amenities"
      },
      "flight": null
    },
    {
      "id": "fav_01JFLIGHT",
      "type": "flight",
      "targetId": "flt_01J9Z8K2",
      "createdAt": "2026-11-09T15:20:00Z",
      "hotel": null,
      "flight": {
        "id": "flt_01J9Z8K2",
        "airline": "Emirates",
        "flightCode": "EK 205",
        "departureTime": "09:50",
        "arrivalTime": "12:10",
        "departureLabel": "LHE",
        "arrivalLabel": "DXB",
        "duration": "2h 20m",
        "aircraft": "Airbus A330",
        "price": { "amount": 42000, "currency": "USD" },
        "rating": 4.8,
        "reviewCount": 54
      }
    }
  ],
  "meta": {
    "page": 1,
    "pageSize": 12,
    "totalItems": 2,
    "totalPages": 1
  },
  "counts": {
    "flights": 1,
    "places": 1
  }
}
```

`counts.places` is the UI-friendly name for hotel favourites.

### `POST /favourites`

Auth: yes

```json
{
  "type": "hotel",
  "targetId": "htl_01JCVK"
}
```

`201 Created`

```json
{
  "data": {
    "id": "fav_01JHOTEL",
    "type": "hotel",
    "targetId": "htl_01JCVK",
    "createdAt": "2026-11-11T11:10:00Z"
  }
}
```

The same flight or hotel cannot be saved twice. Return the existing favourite with `200 OK` instead of creating a duplicate.

### `DELETE /favourites/:favouriteId`

Auth: yes

`204 No Content`.

## 11. Canonical Schemas

These schemas are the contract-level data models. They can be added under `src/app/core/models` and reused by HTTP services. They intentionally separate API models from the display strings currently hard-coded in the components.

### Shared primitives

```ts
export type ISODate = string;       // YYYY-MM-DD
export type ISODateTime = string;   // ISO 8601 with timezone
export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'NGN' | string;

export interface Money {
  /** Integer amount in the currency's minor unit. $240.00 -> 24000. */
  amount: number;
  currency: CurrencyCode;
}

export interface PageMeta {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface Page<T> {
  data: T[];
  meta: PageMeta;
}

export interface ResourceResponse<T> {
  data: T;
}

export interface ApiError {
  error: {
    code: string;
    message: string;
    details?: Array<{ field: string; message: string }>;
    requestId?: string;
  };
}

export interface Address {
  line1: string;
  line2: string | null;
  city: string;
  state: string | null;
  postalCode: string;
  countryCode: string;
}
```

### User schema

```ts
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  pendingEmail: string | null;
  phone: string | null;
  avatarUrl: string | null;
  dateOfBirth: ISODate | null;
  address: Address | null;
  emailVerified: boolean;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

export interface AuthSession {
  user: User;
  accessToken: string;
  expiresIn: number;
}

export interface UserSession {
  id: string;
  device: string;
  ipAddress: string;
  location: string | null;
  current: boolean;
  lastActiveAt: ISODateTime;
  createdAt: ISODateTime;
}

export type AuthProvider = 'google' | 'facebook' | 'apple';

export interface SocialLoginRequest {
  provider: AuthProvider;
  idToken: string;
  redirectUri?: string;
}
```

### Preference schemas

```ts
export interface NotificationPreferences {
  bookingUpdates: boolean;
  priceAlerts: boolean;
  deals: boolean;
  productNews: boolean;
}

export type SeatPreference = 'noPreference' | 'aisle' | 'window' | 'extraLegroom';

export interface TravelPreferences {
  showTaxesUpfront: boolean;
  autoCheckIn: boolean;
  currency: CurrencyCode;
  language: string;
  seatPreference: SeatPreference;
}

export type ThemePreference = 'light' | 'dark' | 'system';
export type DensityPreference = 'comfortable' | 'compact';

export interface AppearancePreferences {
  theme: ThemePreference;
  density: DensityPreference;
}

export interface PrivacyPreferences {
  twoFactorEnabled: boolean;
  saveSearchHistory: boolean;
  personalisedRecommendations: boolean;
}

export interface UserPreferences {
  notifications: NotificationPreferences;
  travel: TravelPreferences;
  appearance: AppearancePreferences;
  privacy: PrivacyPreferences;
  updatedAt: ISODateTime;
}
```

### Discovery schemas

```ts
export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  imageUrl: string;
  tourCount: number;
}

export interface Tour {
  id: string;
  destinationId: string;
  title: string;
  description: string;
  durationDays: number;
  price: Money;
  imageUrl: string;
}

export type LocationType = 'airport' | 'city' | 'hotel' | 'destination';

export interface LocationSuggestion {
  id: string;
  type: LocationType;
  label: string;
  city: string;
  countryCode: string;
  iataCode: string | null;
  hotelId: string | null;
  destinationId: string | null;
}

export interface PromotionResult {
  code: string;
  valid: boolean;
  description: string | null;
  reason: string | null;
  discount: Money;
  finalTotal: Money;
  expiresAt: ISODateTime | null;
}
```

### Flight schemas

```ts
export interface Airport {
  iataCode: string;
  name: string;
  city: string;
  countryCode: string;
}

export interface Airline {
  iataCode: string;
  name: string;
  logoUrl?: string;
}

export type CabinClass = 'economy' | 'premiumEconomy' | 'business' | 'first';
export type FlightSort = 'cheapest' | 'best' | 'quickest' | 'recommended';

export interface BaggageAllowance {
  carryOn: string | null;
  checked: string | null;
}

export interface FlightOfferSummary {
  id: string;
  airline: Airline;
  flightNumber: string;
  aircraft: string;
  origin: Airport;
  destination: Airport;
  departureAt: ISODateTime;
  arrivalAt: ISODateTime;
  durationMinutes: number;
  stops: number;
  cabinClass: CabinClass;
  price: Money;
  rating: number;
  reviewCount: number;
  badge: string | null;
  isFeatured: boolean;
  imageUrl: string;
  baggage: BaggageAllowance;
}

export interface FlightSegment {
  id: string;
  flightNumber: string;
  airline: Airline;
  aircraft: string;
  origin: Airport;
  destination: Airport;
  departureAt: ISODateTime;
  arrivalAt: ISODateTime;
  durationMinutes: number;
  terminal: string | null;
  gate: string | null;
}

export interface FlightOfferDetail extends FlightOfferSummary {
  galleryImages: string[];
  segments: FlightSegment[];
  amenities: string[];
  policies: string[];
  refundable: boolean;
  changeable: boolean;
  seatsRemaining: number | null;
}

export interface SearchFacetValue {
  value: string | number | boolean;
  label: string;
  count: number;
}

export interface FlightSearchFacets {
  priceRange: { min: Money; max: Money };
  airlines: SearchFacetValue[];
  stops: SearchFacetValue[];
}
```

### Stay schemas

```ts
export type PropertyType = 'hotel' | 'motel' | 'resort';
export type HotelSort = 'cheapest' | 'best' | 'recommended';

export interface HotelSummary {
  id: string;
  name: string;
  location: string;
  category: string;
  stars: number;
  rating: number;
  reviewCount: number;
  pricePerNight: Money;
  priceNote: string;
  totalPrice: Money;
  imageUrl: string;
  imageCount: number;
  official: boolean;
  amenities: string[];
  freeCancellation: boolean;
}

export interface HotelAmenity {
  key: string;
  label: string;
}

export interface HotelRoom {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string;
  pricePerNight: Money;
  totalPrice: Money;
  bedType: string;
  maxOccupancy: number;
  breakfastIncluded: boolean;
  freeCancellation: boolean;
  refundable: boolean;
  roomsRemaining: number;
}

export interface HotelDetail extends Omit<HotelSummary, 'amenities'> {
  ratingLabel: string;
  description: string;
  address: string;
  geo: { latitude: number; longitude: number };
  mapsUrl: string;
  images: string[];
  tags: string[];
  amenities: HotelAmenity[];
  checkInTime: string;
  checkOutTime: string;
  policies: string[];
  rooms: HotelRoom[];
}

export interface HotelReview {
  id: string;
  score: number;
  label: string;
  name: string;
  avatarUrl: string;
  text: string;
  createdAt: ISODateTime;
}

export interface HotelReviewSummary {
  rating: number;
  ratingLabel: string;
  reviewCount: number;
}

export interface HotelSearchFacets {
  priceRange: { min: Money; max: Money };
  propertyTypes: SearchFacetValue[];
  ratings: SearchFacetValue[];
}
```

### Booking schemas

```ts
export type BookingType = 'flight' | 'stay';
export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';
export type BookingView = 'upcoming' | 'completed' | 'cancelled';
export type PassengerType = 'adult' | 'child' | 'infant';
export type PaymentOption = 'full' | 'partLater';
export type PaymentStatus =
  | 'unpaid'
  | 'authorized'
  | 'processing'
  | 'partiallyPaid'
  | 'paid'
  | 'failed'
  | 'refunded';

export interface ContactDetails {
  email: string;
  phone: string;
}

export interface Passenger {
  firstName: string;
  lastName: string;
  dateOfBirth: ISODate;
  type: PassengerType;
  nationality: string;
  passportNumber: string | null;
  passportExpiry: ISODate | null;
  seatPreference: SeatPreference | null;
}

export interface PricingBreakdown {
  baseFare: Money;
  discount: Money;
  taxes: Money;
  serviceFee: Money;
  total: Money;
}

export interface PaymentSummary {
  option: PaymentOption;
  status: PaymentStatus;
  paidAmount: Money;
  dueAmount: Money;
  nextChargeAt: ISODateTime | null;
  paymentMethodId: string | null;
  receiptUrl?: string | null;
}

export interface TicketInfo {
  number: string;
  seat: string | null;
  gate: string | null;
  boardingAt: ISODateTime | null;
}

export interface FlightBookingDetails {
  offerId: string;
  airline: Pick<Airline, 'iataCode' | 'name'>;
  flightNumber: string;
  origin: Pick<Airport, 'iataCode' | 'city'>;
  destination: Pick<Airport, 'iataCode' | 'city'>;
  departureAt: ISODateTime;
  arrivalAt: ISODateTime;
  durationMinutes: number;
  cabinClass: CabinClass;
}

export interface StayBookingDetails {
  hotelId: string;
  name: string;
  address: string;
  imageUrl: string;
}

export interface StayRoomDetails {
  roomId: string;
  name: string;
  roomNumber: string;
  checkIn: ISODate;
  checkOut: ISODate;
  checkInTime: string;
  checkOutTime: string;
}

export interface Booking {
  id: string;
  reference: string;
  type: BookingType;
  status: BookingStatus;
  traveler: ContactDetails & { fullName: string };
  passengers: Passenger[];
  flight: FlightBookingDetails | null;
  hotel: StayBookingDetails | null;
  room: StayRoomDetails | null;
  guests: { adults: number; children: number; roomCount: number } | null;
  pricing: PricingBreakdown;
  payment: PaymentSummary;
  ticket: TicketInfo | null;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
  cancelledAt: ISODateTime | null;
}

export interface BookingListItem {
  id: string;
  reference: string;
  type: BookingType;
  status: BookingStatus;
  title: string;
  subtitle: string;
  startAt: ISODateTime;
  endAt: ISODateTime;
  imageUrl: string;
  total: Money;
  createdAt: ISODateTime;
}

export interface CreateFlightBookingRequest {
  offerId: string;
  contact: ContactDetails;
  passengers: Passenger[];
  paymentOption: PaymentOption;
  paymentMethodId: string;
  promoCode?: string | null;
  specialRequests?: string | null;
}

export interface CreateHotelBookingRequest {
  hotelId: string;
  roomId: string;
  checkIn: ISODate;
  checkOut: ISODate;
  roomCount: number;
  adults: number;
  children: number;
  guestName: string;
  contact: ContactDetails;
  paymentOption: PaymentOption;
  paymentMethodId: string;
  promoCode?: string | null;
  specialRequests?: string | null;
}
```

### Payment and favourite schemas

```ts
export type CardBrand = 'visa' | 'mastercard' | 'amex' | 'discover' | 'other';

export interface PaymentMethod {
  id: string;
  brand: CardBrand;
  last4: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
  createdAt: ISODateTime;
}

export interface CreatePaymentMethodRequest {
  provider: string;
  providerPaymentMethodId: string;
  setDefault: boolean;
}

export interface FavouriteHotelSnapshot {
  id: string;
  name: string;
  location: string;
  category: string;
  stars: number;
  rating: number;
  ratingLabel: string;
  reviewCount: number;
  pricePerNight: Money;
  priceNote: string;
  imageUrl: string;
  imageCount: number;
  amenities: string;
}

export interface FavouriteFlightSnapshot {
  id: string;
  airline: string;
  flightCode: string;
  departureTime: string;
  arrivalTime: string;
  departureLabel: string;
  arrivalLabel: string;
  duration: string;
  aircraft: string;
  price: Money;
  rating: number;
  reviewCount: number;
}

export interface FavouriteHotel {
  id: string;
  type: 'hotel';
  targetId: string;
  createdAt: ISODateTime;
  hotel: FavouriteHotelSnapshot;
  flight: null;
}

export interface FavouriteFlight {
  id: string;
  type: 'flight';
  targetId: string;
  createdAt: ISODateTime;
  hotel: null;
  flight: FavouriteFlightSnapshot;
}

export type Favourite = FavouriteHotel | FavouriteFlight;
```

## 12. Screen-to-Endpoint Map

| Screen / component | Endpoints |
| --- | --- |
| Home destination cards | `GET /destinations` |
| Home tour cards | `GET /tours` |
| Flight and stay location inputs | `GET /locations/autocomplete` |
| Flight or stay promo code | `POST /promotions/validate` |
| Login | `POST /auth/login`, `POST /auth/social` |
| Create account | `POST /auth/register`, then `POST /payment-methods` for the card step |
| Forgot password | `POST /auth/forgot-password`, `POST /auth/verify-reset-code`, `POST /auth/reset-password` |
| Flight search | `GET /flights/search` |
| Flight listing and filters | `GET /flights/search` with filter and sort query parameters |
| Flight details | `GET /flights/:offerId` |
| Flight booking | `GET /users/me`, `GET /payment-methods`, `POST /bookings/flights`, `POST /bookings/:bookingId/payments` |
| Hotel search | `GET /hotels/search` |
| Hotel listing and filters | `GET /hotels/search` with filter and sort query parameters |
| Hotel details | `GET /hotels/:hotelId`, `GET /hotels/:hotelId/rooms`, `GET /hotels/:hotelId/reviews` |
| Hotel booking | `GET /payment-methods`, `POST /bookings/hotels`, `POST /bookings/:bookingId/payments` |
| Favourites | `GET /favourites`, `POST /favourites`, `DELETE /favourites/:favouriteId` |
| Account details | `GET /users/me`, `PATCH /users/me`, `PATCH /users/me/password`, `POST /users/me/emails` |
| Tickets/Bookings | `GET /bookings`, `GET /bookings/:bookingId`, `GET /bookings/:bookingId/ticket` |
| Account payment methods | `GET /payment-methods`, `POST /payment-methods`, `DELETE /payment-methods/:paymentMethodId` |
| Settings | `GET /users/me/preferences`, `PATCH /users/me/preferences`, `PATCH /users/me/password`, `GET /users/me/sessions`, `DELETE /users/me/sessions/:sessionId`, `GET /users/me/export` |

## 13. Changes Needed in Existing Models

The current models in `src/app/core/models` are useful starting points but are smaller than the API contract:

- `Booking`: replace the flat `tourId`, `travelerName`, `travelerEmail`, `departureDate`, and `guests` fields with `type`, `traveler`, `passengers`, `flight`, `hotel`, `room`, `pricing`, and `payment`. Keep `reference` and `status`.
- `BookingStatus`: extend from `pending | confirmed | cancelled` to `pending | confirmed | completed | cancelled`. `upcoming` is a list view, not a stored status.
- `Tour`: change `price: number` plus `currency: string` to a single `price: Money` field.
- `Destination`: keep the existing fields and add `tourCount` for the home-page cards.
- New models: `User`, `AuthSession`, `UserPreferences`, `FlightOfferSummary`, `FlightOfferDetail`, `HotelSummary`, `HotelDetail`, `HotelRoom`, `HotelReview`, `Booking`, `PaymentMethod`, and `Favourite`.

## 14. Suggested Implementation Order

1. `Money`, pagination, error envelope, `User`, and auth endpoints.
2. Locations, destinations, and tours.
3. Flight and hotel search/detail endpoints.
4. Payment methods and booking creation.
5. Booking history, ticket download, cancellation, and favourites.
6. Preferences, sessions, and data export.

Search endpoints can initially wrap a mock or third-party provider. Keep the response envelope stable so the Angular UI does not need to change when the provider is replaced.
