<?php
/**
 * PHP-CS-Fixer configuration for QuickTasker
 * 
 * Configured to align with WordPress Coding Standards as closely as possible.
 * 
 * Run with:
 * - composer cs:check  (check for violations)
 * - composer cs:fix    (automatically fix violations)
 */

$finder = PhpCsFixer\Finder::create()
    ->in(__DIR__ . '/php')
    ->append([__DIR__ . '/quicktasker.php'])
    ->exclude('libs')  // Exclude third-party libraries (tfpdf)
    ->notPath('vendor')
    ->notPath('tests');

$config = new PhpCsFixer\Config();
return $config
    ->setRiskyAllowed(true)
    ->setRules([
        '@PSR12' => true,
        
        // WordPress-specific style preferences
        'array_syntax' => ['syntax' => 'short'], // WordPress allows short syntax in modern code
        'binary_operator_spaces' => [
            'default' => 'single_space',
            'operators' => [
                '=>' => 'align_single_space_minimal',
            ]
        ],
        'blank_line_after_namespace' => true,
        'blank_line_after_opening_tag' => true,
        'blank_line_before_statement' => [
            'statements' => ['return', 'try', 'throw']
        ],
        'braces' => [
            'allow_single_line_closure' => true,
            'position_after_functions_and_oop_constructs' => 'next',
            'position_after_control_structures' => 'same',
            'position_after_anonymous_constructs' => 'same',
        ],
        'cast_spaces' => ['space' => 'single'],
        'class_attributes_separation' => [
            'elements' => [
                'method' => 'one',
            ]
        ],
        'concat_space' => ['spacing' => 'one'], // WordPress uses spaces around concatenation
        'declare_equal_normalize' => ['space' => 'none'],
        'function_typehint_space' => true,
        'indentation_type' => true,
        'linebreak_after_opening_tag' => true,
        'lowercase_cast' => true,
        'lowercase_static_reference' => true,
        'magic_constant_casing' => true,
        'magic_method_casing' => true,
        'method_argument_space' => [
            'on_multiline' => 'ensure_fully_multiline',
        ],
        'native_function_casing' => true,
        'native_function_type_declaration_casing' => true,
        'no_blank_lines_after_class_opening' => true,
        'no_blank_lines_after_phpdoc' => true,
        'no_empty_comment' => true,
        'no_empty_phpdoc' => true,
        'no_empty_statement' => true,
        'no_extra_blank_lines' => [
            'tokens' => [
                'extra',
                'throw',
                'use',
            ]
        ],
        'no_leading_namespace_whitespace' => true,
        'no_mixed_echo_print' => ['use' => 'echo'],
        'no_multiline_whitespace_around_double_arrow' => true,
        'no_short_bool_cast' => true,
        'no_singleline_whitespace_before_semicolons' => true,
        'no_spaces_around_offset' => true,
        'no_trailing_comma_in_list_call' => true,
        'no_trailing_comma_in_singleline_array' => true,
        'no_unneeded_control_parentheses' => true,
        'no_unused_imports' => true,
        'no_whitespace_before_comma_in_array' => true,
        'no_whitespace_in_blank_line' => true,
        'normalize_index_brace' => true,
        'object_operator_without_whitespace' => true,
        'ordered_imports' => ['sort_algorithm' => 'alpha'],
        'phpdoc_align' => ['align' => 'left'], // WordPress typically left-aligns
        'phpdoc_indent' => true,
        'phpdoc_no_access' => true,
        'phpdoc_no_package' => true,
        'phpdoc_scalar' => true,
        'phpdoc_single_line_var_spacing' => true,
        'phpdoc_summary' => true,
        'phpdoc_trim' => true,
        'phpdoc_types' => true,
        'phpdoc_var_without_name' => true,
        'return_type_declaration' => ['space_before' => 'none'],
        'short_scalar_cast' => true,
        'single_class_element_per_statement' => true,
        'single_line_comment_style' => ['comment_types' => ['hash']],
        'single_quote' => true,
        'space_after_semicolon' => ['remove_in_empty_for_expressions' => true],
        'standardize_not_equals' => true,
        'ternary_operator_spaces' => true,
        'trim_array_spaces' => true,
        'unary_operator_spaces' => true,
        'whitespace_after_comma_in_array' => true,
        
        // WordPress prefers Yoda conditions, but php-cs-fixer has limited support
        // This would be better handled by WordPress-specific tools like PHPCS
        'yoda_style' => [
            'equal' => true,
            'identical' => true,
            'less_and_greater' => false,
        ],
    ])
    ->setFinder($finder);
