const USER_KEY = "users";

interface StoredUser {
  username: string;
  name: string;
}

// 회원 가입 시 사용자 정보 저장
export const saveUser = (username: string, name: string): void => {
  const users: StoredUser[] = JSON.parse(
    localStorage.getItem(USER_KEY) || "[]",
  );

  // 중복 확인
  if (users.find((u) => u.username === username)) {
    console.warn("이미 존재하는 사용자입니다.");
    return;
  }

  users.push({ username, name });
  localStorage.setItem(USER_KEY, JSON.stringify(users));
  console.log("사용자 정보 저장:", { username, name });
};

// username으로 이름 조회
export const getUserName = (username: string): string | null => {
  const users: StoredUser[] = JSON.parse(
    localStorage.getItem(USER_KEY) || "[]",
  );

  const user = users.find((u) => u.username === username);
  return user?.name || null;
};

// 모든 사용자 조회 (디버깅용)
export const getAllUsers = (): StoredUser[] => {
  return JSON.parse(localStorage.getItem(USER_KEY) || "[]");
};
