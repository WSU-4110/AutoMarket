import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import App from "./SignInPage";

test("renders login form", () => {
  render(<App />);
  expect(screen.getByText(/Login/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  expect(screen.getByText(/Logout/i)).toBeInTheDocument();
});

test("logs in successfully", async () => {
  render(<App />);

  // Mock the signInWithEmailAndPassword function
  jest.spyOn(global, "signInWithEmailAndPassword").mockResolvedValueOnce();

  userEvent.type(screen.getByLabelText(/Email/i), "test@example.com");
  userEvent.type(screen.getByLabelText(/Password/i), "password");
  fireEvent.click(screen.getByText(/Login/i));

  await waitFor(() => {
    expect(screen.getByText(/Successfully logged in!/i)).toBeInTheDocument();
  });
});

test("handles login error", async () => {
  render(<App />);

  // Mock the signInWithEmailAndPassword function to throw an error
  jest
    .spyOn(global, "signInWithEmailAndPassword")
    .mockRejectedValueOnce(new Error("Invalid credentials"));

  userEvent.type(screen.getByLabelText(/Email/i), "test@example.com");
  userEvent.type(screen.getByLabelText(/Password/i), "password");
  fireEvent.click(screen.getByText(/Login/i));

  await waitFor(() => {
    expect(
      screen.getByText(/Login Error: Invalid credentials/i)
    ).toBeInTheDocument();
  });
});

test("logs out successfully", async () => {
  render(<App />);

  // Mock the signOut function
  jest.spyOn(global, "signOut").mockResolvedValueOnce();

  fireEvent.click(screen.getByText(/Logout/i));

  await waitFor(() => {
    expect(screen.getByText(/Successfully logged out!/i)).toBeInTheDocument();
  });
});

test("handles logout error", async () => {
  render(<App />);

  // Mock the signOut function to throw an error
  jest
    .spyOn(global, "signOut")
    .mockRejectedValueOnce(new Error("Logout failed"));

  fireEvent.click(screen.getByText(/Logout/i));

  await waitFor(() => {
    expect(
      screen.getByText(/Logout Error: Logout failed/i)
    ).toBeInTheDocument();
  });
});

test("displays user info when logged in", async () => {
  render(<App />);

  // Mock the onAuthStateChanged function to simulate a logged-in user
  act(() => {
    global.onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  });

  expect(screen.getByText(/Logged in as:/i)).toBeInTheDocument();
  expect(screen.getByText(/Logout/i)).toBeInTheDocument();
});

test("does not display user info when logged out", async () => {
  render(<App />);

  // Mock the onAuthStateChanged function to simulate a logged-out user
  act(() => {
    global.onAuthStateChanged(auth, (user) => {
      setCurrentUser(null);
    });
  });

  expect(screen.queryByText(/Logged in as:/i)).not.toBeInTheDocument();
  expect(screen.getByText(/Logout/i)).toBeInTheDocument();
});
