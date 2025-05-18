import { selectDirection } from '@/core/store/features/direction/directionSelector';
import { changeDirection } from '@/core/store/features/direction/directionSlice';
import { selectTheme } from '@/core/store/features/theme/themeSelectore';
import { changeTheme } from '@/core/store/features/theme/themeSlice';
import { useAppDispatch, useAppSelector } from '@/core/store/hooks';
import type { Theme } from '@/core/store/types';
import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { useEffect } from 'react';

export const Route = createRootRoute({
  component: RootComponent,
});

const THEME_OPTIONS = Object.freeze<readonly Theme[]>(['light', 'dark', 'green', 'purple']);

const isValidTheme = (value: string): value is Theme => {
  return THEME_OPTIONS.includes(value as Theme);
};

function RootComponent() {
  const theme = useAppSelector(selectTheme);
  const direction = useAppSelector(selectDirection);
  const dispatch = useAppDispatch();
  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    if (isValidTheme(value)) {
      dispatch(changeTheme(value));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    THEME_OPTIONS.forEach((element) => {
      document.documentElement.classList.remove(element);
    });
    document.documentElement.classList.add(theme);
    document.documentElement.style.direction = direction;
  }, [theme, direction]);

  return (
    <>
      <div className="flex gap-2 p-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{' '}
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
        <Link to="/profile" className="[&.active]:font-bold">
          Profile
        </Link>{' '}
        <Link to="/posts" search={{ q: 'post2' }} className="[&.active]:font-bold">
          Posts
        </Link>{' '}
      </div>
      <header className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Zapp Admin</h1>
        </div>
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          {THEME_OPTIONS.map((option) => (
            <div key={option} className="flex items-center gap-1">
              <input
                type="radio"
                name="theme"
                id={`radio-${option}`}
                value={option}
                checked={theme === option}
                onChange={handleThemeChange}
              />
              <label htmlFor={`radio-${option}`}>{option}</label>
            </div>
          ))}
        </form>
        <div>
          <label htmlFor="ch1">rtl</label>
          <input
            type="checkbox"
            name="ch1"
            id="ch1"
            checked={direction === 'rtl' ? true : false}
            onChange={() => {
              dispatch(changeDirection());
              console.log(direction);
            }}
          />
        </div>
      </header>
      <hr />
      <Outlet />
    </>
  );
}
