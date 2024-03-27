const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setPasswordDialog({ ...passwordDialog, isLoading: true });
  
      // Include passwordType in the passwordData object
      const passwordData = {
        ...newPassword,
        passwordType: newPassword.passwordType // Assuming passwordType is captured in newPassword
      };
  
      if (passwordDialog.isUpdating) {
        const updatedPasswordsState = await updatePassword(passwords, passwordDialog.updatePassword, passwordData, auth);
        if (updatedPasswordsState) {
          setPasswords(updatedPasswordsState);
          setNewPassword(passwordDialog.updatePassword);
        }
      } else {
        const newPasswordsState = await addNewPassword(passwords, passwordData, auth);
        if (newPasswordsState) {
          setPasswords(newPasswordsState);
          setPasswordDialog({ ...passwordDialog, step: 1 });
          setNewPassword(passwordTypeStates.webLogin);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPasswordDialog({ ...passwordDialog, isOpen: false, isLoading: false });
    }
  };
  