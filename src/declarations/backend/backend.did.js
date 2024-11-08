export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'getRandomColor' : IDL.Func([], [IDL.Text], []),
    'getRandomQuote' : IDL.Func([], [IDL.Text], []),
    'getRandomTip' : IDL.Func([], [IDL.Text], []),
    'getStats' : IDL.Func([], [IDL.Nat, IDL.Nat], ['query']),
    'recordSession' : IDL.Func([IDL.Nat], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
