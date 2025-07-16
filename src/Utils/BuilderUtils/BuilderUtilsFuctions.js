import { BsThreeDots } from 'react-icons/bs';
import { v4 as uuidv4 } from 'uuid';

// UTILS FUNCTIONS

export const insertSection = (setSections, newSection, newOrder) => {
  setSections((prev) => {
    const updatedSections = [];
    let inserted = false;

    for (const section of prev.sections || []) {
      if (!inserted && section.order >= newOrder) {
        updatedSections.push({
          ...newSection,
          order: newOrder,
        });
        inserted = true;
      }

      updatedSections.push({
        ...section,
        order: inserted && section.order >= newOrder ? section.order + 1 : section.order,
      });
    }

    if (!inserted) {
      updatedSections.push({
        ...newSection,
        order: newOrder,
      });
    }

    return {
      ...prev,
      sections: updatedSections.sort((a, b) => a.order - b.order),
    };
  });
};

export const duplicateSection = (setSections, duplicateId) => {
  setSections((prev) => {
    const sectionIndex = prev.sections.findIndex((s) => s._id === duplicateId);

    if (sectionIndex === -1) return prev;

    const original = prev.sections[sectionIndex];

    const duplicated = {
      ...JSON.parse(JSON.stringify(original)), // deep clone
      _id: uuidv4(),
      order: original.order + 1,
    };

    const updatedSections = [...prev.sections.slice(0, sectionIndex + 1), duplicated, ...prev.sections.slice(sectionIndex + 1)];

    const reordered = updatedSections.map((section, index) => ({
      ...section,
      order: index + 1,
    }));

    return {
      ...prev,
      sections: reordered,
    };
  });
};

export const toggleSectionVisibility = (setSections, sectionId) => {
  setSections((prev) => {
    const updatedSections = prev.sections.map((section) => {
      if (section._id === sectionId) {
        return {
          ...section,
          isVisible: !section.isVisible,
        };
      }
      return section;
    });

    return {
      ...prev,
      sections: updatedSections,
    };
  });
};

export const removeSection = (setSections, sectionId) => {
  setSections((prev) => {
    const sectionIndex = prev.sections.findIndex((s) => s._id === sectionId);
    if (sectionIndex === -1) return prev;

    const updatedSections = prev.sections.filter((s) => s._id !== sectionId);

    const reordered = updatedSections.map((section, index) => ({
      ...section,
      order: index + 1,
    }));

    return {
      ...prev,
      sections: reordered,
    };
  });
};
