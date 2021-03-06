import { API_BASE_URL, ACCESS_TOKEN } from "../constants/constant";

export function getCurrentUser() {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("Access token not set.");
  }
  return request({
    url: API_BASE_URL + "/user/me",
    method: "GET"
  });
}

export function signUp(signupRequest) {
  return request({
    url: API_BASE_URL + "/auth/signup",
    method: "POST",
    body: JSON.stringify(signupRequest)
  });
}

export function login(loginRequest) {
  return request({
    url: API_BASE_URL + "/auth/signin",
    method: "POST",
    body: JSON.stringify(loginRequest)
  });
}

export function checkEmailAvailability(email) {
  return request({
    url: API_BASE_URL + "/user/checkEmailAvailability?email=" + email,
    method: "GET"
  });
}

export function confirmRegistration(token) {
  return request({
    url: API_BASE_URL + "/auth/confirm?token=" + token,
    method: "GET"
  });
}

export function getAccounts() {
  return request({
    url: API_BASE_URL + "/getAccounts",
    method: "GET"
  });
}

export function getAllPayees() {
  return request({
    url: API_BASE_URL + "/allPayees",
    method: "GET"
  });
}

export function createAccount(account) {
  return request({
    url: API_BASE_URL + "/createAccount",
    method: "POST",
    body: JSON.stringify(account)
  });
}

export function updateBudget(subcategory) {
  return request({
    url: API_BASE_URL + "/updateBudget",
    method: "PUT",
    body: JSON.stringify(subcategory)
  });
}

export function updateToBeBudget(toBeBudget) {
  return request({
    url: API_BASE_URL + "/updateToBeBudget?toBeBudget=" + toBeBudget,
    method: "PUT",
    body: JSON.stringify(toBeBudget)
  });
}

export function deleteCategoryRequest(category) {
  return request({
    url: API_BASE_URL + "/deleteCategory",
    method: "DELETE",
    body: JSON.stringify(category)
  });
}

export function deleteSubcategoryRequest(subcategory) {
  return request({
    url: API_BASE_URL + "/deleteSubcategory",
    method: "DELETE",
    body: JSON.stringify(subcategory)
  });
}

export function createCategory(category) {
  return request({
    url:
      API_BASE_URL +
      "/createCategory?category=" +
      category.name +
      "&subcategory1=" +
      category.subcategory_1 +
      "&subcategory2=" +
      category.subcategory_2 +
      "&subcategory3=" +
      category.subcategory_3 +
      "&year=" +
      category.year +
      "&month=" +
      category.month,
    method: "POST",
    body: JSON.stringify(category)
  });
}

export function createSubCategory(subcategory) {
  return request({
    url:
      API_BASE_URL +
      "/createSubcategory?selectedCategory=" +
      subcategory.selectedCategory +
      "&subcategory=" +
      subcategory.subcategory +
      "&year=" +
      subcategory.year +
      "&month=" +
      subcategory.month,
    method: "POST",
    body: JSON.stringify(subcategory)
  });
}

export function createTransaction(t) {
  return request({
    url:
      API_BASE_URL +
      "/createTransaction?subcategory=" +
      t.subcategory +
      "&payee=" +
      t.payee +
      "&year=" +
      t.year +
      "&month=" +
      t.month +
      "&day=" +
      t.day +
      "&account=" +
      t.account +
      "&outcome=" +
      t.outcome +
      "&newPayee=" +
      t.newPayee +
      "&description=" +
      t.description +
      "&sum=" +
      t.sum,
    method: "POST",
    body: JSON.stringify(t)
  });
}

export function getBudgetData(year, month) {
  return request({
    url:
      API_BASE_URL + "/budget/getBudgetData/?year=" + year + "&month=" + month,
    method: "GET"
  });
}

export function getAllCategories() {
  return request({
    url: API_BASE_URL + "/allCategories",
    method: "GET"
  });
}

export function getAllTransactions() {
  return request({
    url: API_BASE_URL + "/getAllTransactions",
    method: "GET"
  });
}

export function getToBeBudget() {
  return request({
    url: API_BASE_URL + "/toBeBudget",
    method: "GET"
  });
}

const request = options => {
  const headers = new Headers({
    "Content-Type": "application/json"
  });

  if (localStorage.getItem(ACCESS_TOKEN)) {
    headers.append(
      "Authorization",
      "Bearer " + localStorage.getItem(ACCESS_TOKEN)
    );
  }
  const defaults = { headers: headers };
  options = Object.assign({}, defaults, options);
  return fetch(options.url, options).then(response =>
    response.json().then(jsonResponse => {
      if (!response.ok) {
        return Promise.reject(jsonResponse);
      }
      return jsonResponse;
    })
  );
};
