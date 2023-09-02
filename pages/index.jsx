import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';

import styles from 'styles/Home.module.css'

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [username, setUserName] = useState('');
  const [userError, setUserError] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);

    if(error) setError('');
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
    
    if(userError) setUserError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Email validation using regex
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email || !email.match(emailRegex)) {
      setError('Please enter a valid email address');
      return;
    }

    if(!username || username?.length < 3){
      setUserError('Please enter a valid name');
      return;
    }

    // Valid email, navigate to new page
    router.push(`/question?name=${username}`, undefined, { shallow: true});
  };


  return (
    <div className={styles.welcomeContainer}>
      <Image alt='Josh talks logo' src="https://www.joshtalks.com/wp-content/themes/josh_talks/img/josh-logo.svg" width={300} height={200} />

      <form className={styles.emailForm} onSubmit={handleSubmit}>
        <h1 className={styles.welcomeHeading}>Welcome to <b style={{ color: "#2385c7" }}>Josh</b> <b style={{ color: "#f4792a" }}>Talks</b> Quiz</h1>
        <div className={styles.input__wrapper}>
          <label htmlFor="user_email">
            Email:
          </label>
          <input type='email' id='user_email' autoComplete='true' className={styles.input} placeholder='Please enter your email' value={email} onChange={handleEmailChange} />
          {error && <p>{error}</p>}
        </div>
        <div className={styles.input__wrapper}>
          <label htmlFor="username">
            User Name:
          </label>
          <input type='text' id='username' autoComplete='true' className={styles.input} placeholder='Please enter your name' value={username} onChange={handleUserNameChange} />
          {userError && <p>{userError}</p>}
        </div>
        <button className={styles.emailButton} type="submit">Submit</button>
      </form>
    </div>
  );
}
