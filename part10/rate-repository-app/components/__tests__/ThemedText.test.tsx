import { render, fireEvent } from "@testing-library/react-native";
import { ThemedText } from "../ThemedText";
import { LoginForm } from "../LoginForm";
import { RepositoriesData } from "@/types";
import { RepositoryList } from "../RepositoryList";

describe("<ThemedText />", () => {
  const themedText = <ThemedText testID="themedText">It renders!</ThemedText>;
  it("renders correctly", () => {
    const { debug, getByTestId } = render(themedText);

    expect(getByTestId("themedText")).toHaveTextContent("It renders!");
  });

  it("has custom styles", () => {
    const { getByTestId } = render(
      <ThemedText testID="themedText" style={{ color: "red" }}>
        It renders!
      </ThemedText>
    );

    expect(getByTestId("themedText")).toHaveStyle({ color: "red" });
  });
});

describe("<LoginForm />", () => {
  it("calls the provided function with the correct props", () => {
    const onSubmit = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <LoginForm onSubmit={onSubmit} />
    );

    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Password");

    fireEvent.changeText(emailInput, "test@example.com");
    fireEvent.changeText(passwordInput, "password123");
    fireEvent.press(getByText("Log in"));

    expect(onSubmit).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });
  });
});

describe("<RepositoryList />", () => {
  it("renders repository information", () => {
    const repositories: RepositoriesData = {
      totalCount: 8,
      pageInfo: {
        hasPreviousPage: false,
        hasNextPage: true,
        endCursor:
          "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
        startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
      },
      repositories: {
        edges: [
          {
            node: {
              id: "jaredpalmer.formik",
              fullName: "jaredpalmer/formik",
              description: "Build forms in React, without the tears",
              language: "TypeScript",
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars2.githubusercontent.com/u/4060187?v=4",
              url: "https://github.com/jaredpalmer/formik",
              createdAt: "2019-01-15T17:52:47Z",
              ownerName: "jaredpalmer",
              name: "jaredpalmer",
              openIssuesCount: 2,
              watchersCount: 10,
            },
            cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
          },
          {
            node: {
              id: "async-library.react-async",
              fullName: "async-library/react-async",
              description: "Flexible promise-based React data loader",
              language: "JavaScript",
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars1.githubusercontent.com/u/54310907?v=4",
              url: "https://github.com/jaredpalmer/formik",
              createdAt: "2019-01-15T17:52:47Z",
              ownerName: "jaredpalmer",
              name: "jaredpalmer",
              openIssuesCount: 2,
              watchersCount: 10,
            },
            cursor:
              "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          },
        ],
      },
    };

    const { getByText } = render(
      <RepositoryList repositoriesData={repositories} />
    );
    const repositoryNames = ["jaredpalmer/formik", "async-library/react-async"];

    repositoryNames.forEach((name) => {
      expect(getByText(name)).toBeTruthy();
    });
  });
});
