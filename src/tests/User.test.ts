import User from '../schemas/User';

test('it should be ok', () => {
  const user = new User();

  user.name = "Luiz"

  expect(user.name).toEqual('Luiz')
  
})