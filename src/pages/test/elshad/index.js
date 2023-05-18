import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Elshad() {

  useEffect(() => {
    fetch('/api/')
  }, []);
}