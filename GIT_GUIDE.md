# Git Workflow Guide

## Initial Setup
1. Initialize the repository:
   ```bash
   git init
   ```
2. Add files:
   ```bash
   git add .
   ```
3. Initial Commit:
   ```bash
   git commit -m "feat: initial project setup and scaffolding"
   ```

## Standard Workflow
- **Features**: Create valid commits for each major component.
  ```bash
  git add src/components/header
  git commit -m "feat: add global navigation header"
  ```
- **Fixes**:
  ```bash
  git commit -m "fix: resolve vehicle stats calculation"
  ```

## Branching (Optional)
- Use `git checkout -b feature/new-feature` for isolation.
