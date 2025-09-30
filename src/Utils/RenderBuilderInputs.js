import Checkbox from '@/components/Actions/CheckBox';
import DataSelectionList from '@/components/Actions/DataSelectionList';
import DropDown from '@/components/Actions/DropDown';
import MultiSelectDropdown from '@/components/Actions/MultiSelectDropdown';
import PillSelector from '@/components/Actions/PillSelector';
import RadioButton from '@/components/Actions/RadioButton';
import ToggleSwitch from '@/components/Actions/ToggleSwitch';
import FormInput from '@/components/Forms/FormInput';
import RangeInput from '@/components/Forms/RangeInput';
import FaqUploader from '@/components/Uploaders/FaqUploader';
import ImageSelector from '@/components/Uploaders/ImageSlector';
import SocialLinkSelector from '@/components/Uploaders/SocialLinkSelector';
import TextEditor from '@/components/Uploaders/TextEditor';

export const RenderBuilderInputs = ({ name, placeholder, input, options, multiple, min, max, selectorName, limit, handleInputChange, formData }) => {
  if (input === 'text' || input === 'number') {
    return (
      <FormInput
        type={input}
        key={name}
        value={formData?.sectionData?.[name] ?? ''}
        label={null}
        placeholder={placeholder}
        size="editor"
        required={false}
        onChange={(e) => handleInputChange(name, e.target.value)}
      />
    );
  }

  if (input === 'textEditor') {
    return <TextEditor key={name} editorContent={formData?.sectionData?.[name] ?? ''} setEditorContent={(value) => handleInputChange(name, value)} />;
  }

  if (input === 'pillSelector') {
    return <PillSelector data={options} selectedValue={formData?.sectionData?.[name]} setSelectedValue={(value) => handleInputChange(name, value)} key={name} />;
  }

  if (input === 'range') {
    return <RangeInput key={name} label={`${name}`} min={min} max={max} range={formData?.sectionData?.[name]} setRange={(value) => handleInputChange(name, value)} />;
  }

  if (input === 'faqs') {
    return <FaqUploader key={name} initialFaqs={formData?.[name]} setFaqs={(faqs) => handleInputChange(name, faqs)} />;
  }

  if (input === 'ImageSelector') {
    return <ImageSelector size="large" label={null} key={name} multiple={multiple} image={formData?.sectionData?.[name]} setImage={(image) => handleInputChange(name, image)} />;
  }

  if (input === 'checkbox') {
    return <Checkbox label={placeholder} checked={formData?.sectionData?.[name]} setChecked={(value) => handleInputChange(name, value)} />;
  }

  if (input === 'dropdown') {
    return (
      <DropDown
        defaultOptions={options}
        selectedOption={formData?.[name]}
        setSelectedOption={(option) => handleInputChange(name, option)}
        key={name}
        label={placeholder}
        layout={'label'}
        className="!outline-primaryC !bg-transparent"
      />
    );
  }

  if (input === 'multiDropdown') {
    const optionsData =
      options === 'products'
        ? products.map((product) => ({ label: product?.name, value: product?._id }))
        : options === 'collections'
        ? collections.map((Collection) => Collection?.slug)
        : [];

    return (
      <MultiSelectDropdown
        key={name}
        wantsCustomOption={false}
        defaultOptions={optionsData}
        selectedOptions={Array.isArray(formData?.[name]) ? formData?.[name] : []}
        setSelectedOptions={(options) => handleInputChange(name, options)}
        placeholder={placeholder}
        className="!outline-primaryC !bg-transparent"
      />
    );
  }

  if (input === 'dataSelectionList') {
    return (
      <DataSelectionList
        selectedData={formData?.sectionData?.[name]}
        setSelectedData={(value) => handleInputChange(name, value)}
        selectorName={selectorName}
        customData={options}
        label={placeholder}
        limit={limit}
      />
    );
  }

  if (input === 'socialLinkSelector') {
    return <SocialLinkSelector setSocialLinks={(value) => handleInputChange(name, value)} socialLinks={formData?.sectionData?.[name]} />;
  }
  if (input === 'toggle') {
    return <ToggleSwitch checked={formData?.sectionData?.[name] || false} setChecked={(value) => handleInputChange(name, value)} label={placeholder} />;
  }
  if (input === 'radioButton') {
    return <RadioButton options={options} selectedOption={formData?.sectionData?.[name]} setSelectedOption={(option) => handleInputChange(name, option)} label={placeholder} />;
  }

  return null;
};
