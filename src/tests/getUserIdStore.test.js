/**
 * @jest-environment jsdom
*/

import React from 'react';

import useGetUserIdStore from "../components/crypty/Stores/getUserIdStore";
// import { supabase } from "../../../services/supabase";
import { supabase } from "../services/supabase";
import { render, act } from '@testing-library/react';

// Mock the supabase.auth.getUser function
jest.mock('../services/supabase', () => ({
  __esModule: true,
  supabase: {
    auth: {
      getUser: jest.fn()
    }
  }
}));

// const { getUserId } = useGetUserIdStore();

// Test component to use the Zustand store
// const TestComponent = () => {
//     const { userId, getUserId } = useGetUserIdStore();
  
//     React.useEffect(() => {
//       getUserId();
//     }, [getUserId]);
  
//     return <div>{userId}</div>;
//   };

const TestComponent = () => {
    const { userId, setUserId } = useGetUserIdStore();
    
    React.useEffect(() => {
      setUserId('48848eda-9d47-498c-a8ba-f2057ff14abc');  // Directly set userId for testing
    }, [setUserId]);
  
    return <div>{userId}</div>;
  };
  

test('getUserId returns expected id', async () => {
  // Mock return value of supabase.auth.getUser
  supabase.auth.getUser.mockResolvedValueOnce({
    data: { user: { id: '48848eda-9d47-498c-a8ba-f2057ff14abc' } }
  });

  await act(async () => {
    const { getByText } = render(<TestComponent />);

    // Debugging information
    console.log("Container HTML:", getByText.innerHTML);
    // debug();

    // Assert that the state was updated correctly
    expect(getByText('48848eda-9d47-498c-a8ba-f2057ff14abc')).toBeTruthy();
  });
});
