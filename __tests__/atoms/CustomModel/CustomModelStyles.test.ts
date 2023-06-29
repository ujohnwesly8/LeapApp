import style from '../../../src/components/atoms/CustomModel/CustomModelStyles';
describe('CustomModelStyles', () => {
  test('modalContainer styles', () => {
    expect(style.modalContainer).toHaveProperty('flex', 1);
    expect(style.modalContainer).toHaveProperty(
      'backgroundColor',
      'rgba(0, 0, 0, 0)',
    );
    expect(style.modalContainer).toHaveProperty('justifyContent', 'center');
    expect(style.modalContainer).toHaveProperty('alignItems', 'center');
  });

  test('modalBox styles', () => {
    expect(style.modalBox).toHaveProperty('backgroundColor');
    expect(style.modalBox).toHaveProperty('borderRadius', 5);
    expect(style.modalBox).toHaveProperty('width', 400);
    expect(style.modalBox).toHaveProperty('height', 340);
    expect(style.modalBox).toHaveProperty('marginTop', 500);
    expect(style.modalBox).toHaveProperty('borderTopRightRadius', 30);
    expect(style.modalBox).toHaveProperty('borderTopLeftRadius', 30);
    expect(style.modalBox).toHaveProperty('justifyContent', 'center');
    expect(style.modalBox).toHaveProperty('alignItems', 'center');
  });

  test('modalText styles', () => {
    expect(style.modalText).toHaveProperty('fontSize', 22);
    expect(style.modalText).toHaveProperty('fontFamily', 'Poppins-SemiBold');
  });
});
