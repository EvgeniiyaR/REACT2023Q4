export interface IArtworkResponse {
  id: number;
  api_model: string;
  api_link: string;
  is_boosted: boolean;
  title: string;
  alt_titles: null;
  thumbnail: {
    lqip: string;
    width: number;
    height: number;
    alt_text: string;
  };
  main_reference_number: string;
  has_not_been_viewed_much: boolean;
  boost_rank: null;
  date_start: number;
  date_end: number;
  date_display: string;
  date_qualifier_title: string;
  date_qualifier_id: null;
  artist_display: string;
  place_of_origin: null;
  description: string;
  dimensions: string;
  dimensions_detail: {
    depth_cm: number;
    depth_in: number;
    width_cm: number;
    width_in: number;
    height_cm: number;
    height_in: number;
    diameter_cm: number;
    diameter_in: number;
    clarification: null;
  }[];
  medium_display: string;
  inscriptions: null;
  credit_line: string;
  catalogue_display: null;
  publication_history: null;
  exhibition_history: null;
  provenance_text: null;
  edition: null;
  publishing_verification_level: string;
  internal_department_id: number;
  fiscal_year: number;
  fiscal_year_deaccession: null;
  is_public_domain: boolean;
  is_zoomable: boolean;
  max_zoom_window_size: number;
  copyright_notice: null;
  has_multimedia_resources: boolean;
  has_educational_resources: boolean;
  has_advanced_imaging: boolean;
  colorfulness: number;
  color: {
    h: number;
    l: number;
    s: number;
    percentage: number;
    population: number;
  };
  latitude: null;
  longitude: null;
  latlon: null;
  is_on_view: boolean;
  on_loan_display: null;
  gallery_title: null;
  gallery_id: null;
  nomisma_id: null;
  artwork_type_title: string;
  artwork_type_id: number;
  department_title: string;
  department_id: string;
  artist_id: number;
  artist_title: string;
  alt_artist_ids: [];
  artist_ids: number[];
  artist_titles: string[];
  category_ids: string[];
  category_titles: string[];
  term_titles: string[];
  style_id: null;
  style_title: null;
  alt_style_ids: [];
  style_ids: [];
  style_titles: [];
  classification_id: string;
  classification_title: string;
  alt_classification_ids: [];
  classification_ids: string[];
  classification_titles: string[];
  subject_id: string;
  alt_subject_ids: string[];
  subject_ids: string[];
  subject_titles: string[];
  material_id: null;
  alt_material_ids: [];
  material_ids: [];
  material_titles: [];
  technique_id: null;
  alt_technique_ids: [];
  technique_ids: [];
  technique_titles: [];
  theme_titles: string[];
  image_id: string;
  alt_image_ids: [];
  document_ids: [];
  sound_ids: [];
  video_ids: [];
  text_ids: [];
  section_ids: [];
  section_titles: [];
  site_ids: [];
  suggest_autocomplete_all: {
    input: string[];
    weight: number;
    contexts: {
      groupings: string[];
    };
  }[];
  source_updated_at: string;
  updated_at: string;
  timestamp: string;
}

export interface IArtworksResponse {
  pagination: {
    total: number;
    limit: number;
    offset: number;
    total_pages: number;
    current_page: number;
    next_url: string;
  };
  data: IArtworkResponse[];
  info: {
    license_text: string;
    license_links: string[];
    version: string;
  };
  config: {
    iiif_url: string;
    website_url: string;
  };
}

export interface IArtworkSearchResponse {
  _score: number;
  thumbnail: {
    alt_text: string;
    width: number;
    lqip: string;
    height: number;
  };
  api_model: string;
  is_boosted: boolean;
  api_link: string;
  id: number;
  title: string;
  timestamp: string;
}

export interface IArtworksSearchResponse {
  preference: null;
  pagination: {
    total: number;
    limit: number;
    offset: number;
    total_pages: number;
    current_page: number;
  };
  data: IArtworkSearchResponse[];
  info: {
    license_text: string;
    license_links: string[];
    version: string;
  };
  config: {
    iiif_url: string;
    website_url: string;
  };
}

export interface IArtwork {
  id: number;
  link: string;
  title: string;
  date: string;
  author: string;
  description: string;
  imageId: string;
}
